import { Answer } from "./answer";
import { Hint } from "./hint";

export interface WeeklyBeer {
    id: number;
    startDate: string;
    description: string;
    beerId: number;
    hints: Hint[];
    answers: Answer[];
}
export const defaultWeeklyBeer: WeeklyBeer = {
    id: 0,
    startDate: '',
    description: '',
    beerId: 0,
    hints: [],
    answers: []
}
