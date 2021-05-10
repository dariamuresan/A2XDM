export interface UserCurrentSession{
    username: string,
    token: string
}

export interface LoginResponse{
    token: string,
    success: boolean,
    errors: string[]
}