import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { promisify } from 'util';
import * as crypto from 'crypto';
// import { Credential, CredentialDocument } from 'src/database/schemas/credential.schema';
import { Admin, AdminDocument } from 'src/database/schemas/admin.schema';
import { AdminLoginDto } from './dto/admin-login.dto';
import * as argon2 from 'argon2';
import { Credential, CredentialDocument } from 'src/database/schemas/credential.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Credential.name) private readonly credentialModel: Model<CredentialDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // Generate reset password token
  async generateToken(): Promise<string> {
    const randomBytesAsync = promisify(crypto.randomBytes);
    try {
      const buffer = await randomBytesAsync(48);
      return buffer.toString('hex');
    } catch (error) {
      // Handle error appropriately
      throw new Error('Token generation failed');
    }
  }

  async getTokens(id: string, email: string) {
    const payload = {
      id,
      email,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '300s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRt(id: string, rt: string) {
    await this.adminModel.updateOne({ _id: id }, { refresh_token: rt });
  }

  async login(loginDto: AdminLoginDto, response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const { email, password } = loginDto;

    const credential = await this.credentialModel.findOne({email});

    const admin = await this.adminModel
      .findOne({ 'credential': credential._id })
      .populate('credential');
      
    if (admin) {
      const matched = await argon2.verify(admin.credential.password, password);
      
      if (!matched) {
        throw new UnauthorizedException({
          message: 'Incorrect Email or Password!',
        });
      }

      const { accessToken, refreshToken } = await this.getTokens(
        admin._id.toString(),
        admin.credential.email,
      );

      await this.updateRt(admin._id.toString(), refreshToken);

      response.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return {
        accessToken,
      };
    }
    throw new UnauthorizedException({
      message: 'Incorrect Email or Password!',
    });
  }

  async logout(id: string, request: Request, response: Response) {
    const cookies = request.cookies;
    if (cookies?.jwt) {
      response.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }
    try {
      await this.adminModel.updateOne({ _id: id }, { refresh_token: null });
    } catch (error) {
      console.log(error);
    }

    return true;
  }

  // async getProfile(id: string) {
  //   try {
  //     const admin = await this.adminModel
  //       .findById(id)
  //       .populate('unit')
  //       .populate('role')
  //       .populate('credential');

  //     if (admin?.credential?.password) {
  //       delete admin.credential.password;
  //     }

  //     if (admin?.refresh_token) {
  //       delete admin?.refresh_token;
  //     }

  //     return admin;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async refreshToken(request: Request, response: Response) {
    const cookies = request.cookies;
    if (!cookies?.jwt) throw new UnauthorizedException('Access Denied.');
    const refreshToken = cookies.jwt;
    const admin = await this.adminModel.findOne({ rt: refreshToken }).populate('credential');
    if (!admin) {
      throw new UnauthorizedException('Access Denied');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      if (payload?.id !== admin._id.toString()) {
        throw new UnauthorizedException('Access Denied');
      }
    } catch (error) {
      await this.adminModel.updateOne({ _id: admin._id }, { rt: null });
      response.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      throw new UnauthorizedException('Access Denied');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: admin._id.toString(),
        email: admin.credential.email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '300s',
      },
    );
    return { accessToken };
  }
}
