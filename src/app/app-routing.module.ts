import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['']);

//const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //...canActivate(redirectUnauthorizedToLogin)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
