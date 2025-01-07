export interface Beer {
    id: number;
    name: string;
    breweryName: string;
    type: string;
    alcoholRange: string;
    ratingRange: string;
    imageUrl: string;
  }

  export const defaultBeer: Beer = {
    id: 0,
    name: '',
    breweryName: '',
    type: '',
    alcoholRange: '',
    ratingRange: '',
    imageUrl: ''
  }