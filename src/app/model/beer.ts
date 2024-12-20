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