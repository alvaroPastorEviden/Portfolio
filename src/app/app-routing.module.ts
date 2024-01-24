import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuProyectosComponent } from './components/proyectos/menu-proyectos/menu-proyectos.component';
import { FormacionComponent } from './components/formacion/formacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PruebaComponent } from './components/prueba/prueba.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menuProyectos', component: MenuProyectosComponent },
  { path: 'formacion', component: FormacionComponent },
  { path: 'experiencia', component: ExperienciaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'prueba', component: PruebaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
