import { Beer } from "./beer";
import { WinnerBeer } from "./winner-beer";

export interface CombinedWinnerBeer {
    beer:Beer;
    winnerBeer:WinnerBeer;
}