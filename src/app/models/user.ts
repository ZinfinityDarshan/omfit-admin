import { Document } from './../service/fire.service';
export interface User extends Document{
    username: string,
    password: string,
    active: boolean,
    role: string[]
}
