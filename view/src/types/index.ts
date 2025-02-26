export type IUser = {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    description: string;
    image: string;
    links: string;
}

export type RegisterForm = Pick<IUser, 'email' | 'name' | 'username'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<IUser, 'email'> & {
    password: string
} 

export type ProfileForm = Pick<IUser, 'username' | 'description' > 


export type SocialNetwork = {
    id: number,
    name: string,
    url: string,
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork,'name' | 'url' | 'enabled'>

export type UserName =  Pick<IUser, 'description' | 'name' | 'links' | 'username' | 'image' >