import { UserDTO } from '../Profile/UserDTO';
import { Message } from './Message';

export class Conversation {
    id: number;
    firstUser: UserDTO;
    secondUser: UserDTO;
    messages: Message[];
}