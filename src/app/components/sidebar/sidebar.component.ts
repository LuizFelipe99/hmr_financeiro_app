import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  protected menuItems = [
    {
      label: 'Importar Seguradoras',
      icon: 'dataset',
      route: '/insurance-import'
    },

  ];

  protected logout(): void {

    localStorage.removeItem('token');

    window.location.href = '/login';
  }
}