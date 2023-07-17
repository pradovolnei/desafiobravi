import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//const routes: Routes = [];

const routes: Routes = [
  // Outras rotas existentes...
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'formulario', component: FormularioComponent },
  { path: 'login', component: LoginComponent },
  // Outras rotas existentes...
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // Adicione mais rotas para as outras páginas do sistema
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
