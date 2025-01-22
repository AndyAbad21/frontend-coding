import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentRoute: string = ''; // Almacena la ruta activa

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }
  
  ngOnInit(): void {
    // Escucha los cambios en la URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects; // Actualiza la ruta activa
      }
    });
  }

  navigateTo(path: string) {
    console.log('Navegando a:', path); // Log para confirmar
    this.router.navigate([path]);
    this.currentRoute = path; // Actualiza la ruta actual
  }

  isActive(route: string): boolean {
    return this.currentRoute === route; // Verifica si la ruta es activa
  }
}
