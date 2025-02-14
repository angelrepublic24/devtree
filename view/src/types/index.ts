export type IUser = {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    description: string;
}

export type RegisterForm = Pick<IUser, 'email' | 'name' | 'username'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<IUser, 'email'> & {
    password: string
} 

export type ProfileForm = Pick<IUser, 'username' | 'description' > 