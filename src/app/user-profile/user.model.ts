export interface IUser {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    password?: string,
    passwordConfirmation?: string,
    role?:string
    isNotified : boolean;
}