import { CreateUserDao } from './user.dao';

export class CreateUserMapper {
    public email: string;
    public password: string;
    public name?: string | null | undefined;
    public avatarUrl?: string | null | undefined;

    public constructor(props: CreateUserDao) {
        this.email = props.email;
        this.password = props.password;
        this.name = props.name || null;
        this.avatarUrl = props.avatarUrl || null;
    }
}
