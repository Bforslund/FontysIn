import { Time } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { UserDTO } from '../Profile/UserDTO';

export class Message {
    id: number;
    conversationId: number;
    sender: UserDTO;
    receiver: UserDTO;
    content: string;
    dateTime: Date;
}