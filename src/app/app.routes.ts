import { Routes } from '@angular/router';

import { CsvUploadComponent } from './components/csv-upload/csv-upload.component';
import { LoginComponent } from './components/login/login.component';
import { InsuranceImportComponent } from './pages/insurance-import/insurance-import.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FaqComponent } from './components/faq/faq.component';

import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },


  {
    path: 'import-csv',
    component: CsvUploadComponent,
    canActivate: [authGuard]
  },
  {
    path: 'insurance-import',
    component: InsuranceImportComponent,
    canActivate: [authGuard]
  },

  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  },



];