import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planets-info',
    pathMatch: 'full'
  },
  {
    path: 'planets-info',
    loadChildren: () => 
      import('../app/table/table.module')
      .then(m => m.TableModule)
  },
  {
    path: 'resident-details',
    loadChildren: () => 
      import('../app/dialog/dialog.module')
      .then(m => m.DialogModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
