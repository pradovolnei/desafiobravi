import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';

//const routes: Routes = [];

const routes: Routes = [
  // Outras rotas existentes...
  { path: 'formulario', component: FormularioComponent },
  { path: 'login', component: LoginComponent },
  // Outras rotas existentes...
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
