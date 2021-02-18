import { UserDTO } from '../Profile/UserDTO';

export class Contact {
    id: number;
    user: UserDTO;
    friend: UserDTO;
    isAccepted: boolean;  
}