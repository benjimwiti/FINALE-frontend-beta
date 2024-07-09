import { ITask } from './Task'

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    tasks?: Array<ITask>;
}