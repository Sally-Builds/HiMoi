import 'socket.io';

// declare module 'socket.io' {
//     interface Socket {
//         user?: any; // You can define the specific type of your user here
//     }
// }


declare module 'socket.io' {
    interface Socket {
        user: IUser;
    }
}