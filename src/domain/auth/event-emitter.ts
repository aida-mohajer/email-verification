import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class EventService {
  async handlePreSaveOperation(user: User): Promise<User> {
    user.createdAt = new Date();

    const min = 1000;
    const max = 9999;

    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    user.code = code;

    return user;
  }
}
