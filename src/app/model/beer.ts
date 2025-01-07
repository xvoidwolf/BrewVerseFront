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
    name: '',
    breweryId: 0,
    imageUrl: '', 
    alcoholPercentage: 0, 
    averageRating: 0,
    type: '',
    reviewsId: []
}