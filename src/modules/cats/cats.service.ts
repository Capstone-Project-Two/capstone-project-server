import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = [
    { name: 'Meow', color: 'white' },
    { name: 'Meow meow', color: 'black' },
  ];

  findAll() {
    return this.cats;
  }
}
