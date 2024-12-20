import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddBeerComponent } from './beer/add-beer/add-beer.component';
import { UpdateBeerComponent } from './beer/update-beer/update-beer.component';
import { SearchBeerComponent } from './beer/search-beer/search-beer.component';
import { BeerDetailsComponent } from './beer/beer-details/beer-details.component';
import { MysteryBeerContestComponent } from './beer/mystery-beer-contest/mystery-beer-contest.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "", redirectTo: "home", pathMatch: "full"}, //stringa vuota contenuta in ogni stringa, path match full = dev'essere esattamente vuota
    {path: "game", component: GameComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "add-beer", component: AddBeerComponent},
    {path: "update-beer", component: UpdateBeerComponent},
    {path: "search-beer", component: SearchBeerComponent},
    {path: "details", component: BeerDetailsComponent}, //qui carosello con le recensioni e tasto per farne un'altra
    {path: "contest", component: MysteryBeerContestComponent},
    {path: "**", redirectTo: "pathNotFound"} //se non trova la rotta, reindirizza a pathNotFound
];
