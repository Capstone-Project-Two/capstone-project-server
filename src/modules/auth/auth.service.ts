import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from 'src/config/firebase/firebase';

@Injectable()
export class AuthService {
  async register(createAuthDto: CreateAuthDto) {
    console.log('🚀 ~ AuthService ~ register ~ createAuthDto:', createAuthDto);

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        createAuthDto.email,
        createAuthDto.password,
      );

      return {
        message: 'User Created Successfully !',
        user,
      };
    } catch (error) {
      console.log('🚀 ~ AuthService ~ register ~ error:', error);
      return error
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    console.log('🚀 ~ AuthService ~ login ~ createAuthDto:', createAuthDto);

    try {
      await signInWithEmailAndPassword(
        auth,
        createAuthDto.email,
        createAuthDto.password,
      );

      console.log(auth.currentUser)

      return {
        message: 'Login Successful !',
      };
    } catch (error) {
      console.log('🚀 ~ AuthService ~ login ~ error:', error);
      return error;
    }
  }

  async logout() {
    try {

      console.log('🚀 ~ AuthService ~ logout ~ auth:', auth.currentUser.email);

      await signOut(auth);

      return 'Logout Successful !';
    } catch (error) {
      console.log('🚀 ~ AuthService ~ logout ~ error:', error);
      return error;
    }
  }
}
