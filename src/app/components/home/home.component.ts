import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,private elRef: ElementRef) { }

  isFooterVisible = false;

  ngOnInit(): void {
    const footer = this.elRef.nativeElement.querySelector('.container__footer');
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.isFooterVisible = entry.isIntersecting;
        console.log('Footer visible:', this.isFooterVisible);
      },
      { threshold: 0.72 } // Detecta si el 50% del footer es visible
    );

    observer.observe(footer);
  }

  navigateTo(path: string) {
    console.log('Navegando a:', path); // Log para confirmar
    this.router.navigate([path]);
  }
  

}
