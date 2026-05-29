import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface StoredUser {
  name: string;
  role: string;
}

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
export class SidebarComponent implements OnInit {

  protected currentUser: StoredUser | null = null;

  protected menuItems = [
    {
      label: 'Home',
      icon: 'home',
      route: '/faq'
    },
    {
      label: 'Importar CSV',
      icon: 'dataset',
      route: '/insurance-import'
    },
  ];

  ngOnInit(): void {
    this.currentUser = this.loadUserFromStorage();
  }

  private loadUserFromStorage(): StoredUser | null {
    const rawUser = localStorage.getItem('user');

    if (!rawUser) return null;

    return JSON.parse(rawUser);
  }

  protected logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}