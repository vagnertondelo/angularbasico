import { Routes } from '@angular/router';
import { ProdutoComponent } from './component/produto-component/produto-component';
import { HomeComponent } from './component/home-component/home-component';
import { LoginComponent } from './component/login-component/login-component';
import { RecuperarSenhaComponent } from './component/recuperar-senha-component/recuperar-senha-component';

export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
{path: 'produtos', component: ProdutoComponent},
{path: 'home', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'recuperar-senha', component: RecuperarSenhaComponent},

];
