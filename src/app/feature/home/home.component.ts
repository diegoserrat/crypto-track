import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'crypto-home',
  imports: [CommonModule, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

}
