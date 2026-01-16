import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/layout/menu/menu.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MenuComponent, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WebAppAudisoft');
}
