import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CryptoService } from '../../services/crypto.service';
import { Crypto } from '../../shared/types/crypto';

@Component({
  selector: 'crypto-track-list',
  standalone: true,
  imports: [CommonModule,  MatListModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  
})
export class ListComponent {

  cryptos: Crypto[] = [];

  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.cryptoService.listAllCryptos().subscribe((response) => {
      this.cryptos = response;
    });
  }
}
