import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { map } from 'rxjs';

@Injectable()
export class StripeService {
  constructor(private readonly httpService: HttpService) {}

  async createPaymentIntent(createStripeDto: CreateStripeDto) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Bearer sk_test_51PiHciKgdNzS6wGQ2Ku8xqJob2kC7qwIXwkqanRrav37oIKOlnZUKN3ivjikdyrawQxujkist6slsk8w6IeyTGow00yd6i4KBM',
      },
    };

    const res = await this.httpService
      .post(
        'https://api.stripe.com/v1/payment_intents',
        createStripeDto,
        requestConfig,
      )
      .pipe(
        map((response) => {
          return response.data
        }),
      );
    return res
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
