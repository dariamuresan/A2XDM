export interface IReview {
    id : number,
    stars : number,
    date : Date,
    comment : string, 
    username : string,
    replies : IReply[]
}

export interface IReply {
    id : number, 
    username : string,
    content : string,
    date : Date
}