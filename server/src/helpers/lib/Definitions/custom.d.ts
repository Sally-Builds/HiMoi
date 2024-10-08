import { Server } from 'socket.io';
import IUser from '../../../resources/users/user.interface';

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
      isTest: boolean;
      io: Server
    }
  }
}
