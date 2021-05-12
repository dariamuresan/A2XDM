export interface UserCurrentSession{
    username: string,
    token: string
}

export interface LoginResponse{
    token: string,
    success: boolean,
    errors: string[]
}

export interface UserResponse {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    image: string,
    newsletter : boolean
}