export interface Beer {
    id:number;
    imageUrl:string;
    name:string;
    alcoholPercentage:number;
    type:string;
    
}

export const defaultBeer: Beer = {
    id: 0,
    imageUrl: '', 
    name: '', 
    alcoholPercentage: 0, 
    type: ''
}