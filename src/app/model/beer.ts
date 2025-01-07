export interface Beer {
    id: number;
    name: string;
    breweryId: number;
    type: string;
    alcoholPercentage: number;
    averageRating: number;
    imageUrl: string;
    reviewsId: number[];
}
export const defaultBeer: Beer = {
    id: 0,
    imageUrl: '', 
    name: '', 
    alcoholPercentage: 0, 
    type: ''
}