export interface IMovie {
    description : string,
    genres : IGenre[],
    id : string,
    rating : number,
    release_date : string,
    title : string,
    actors : IActor[],
    imagePath : string;
}

export interface ICompressedMovie {
    id : string,
    release_date : Date,
    title : string,
    imagePath : string;
}

export interface IGenre {
    id : number, 
    tmdbId : number, 
    name : string;
}

export interface IActor {
    id : number,
    name : string,
    imagePath : string,
    tmdbId : number;
}