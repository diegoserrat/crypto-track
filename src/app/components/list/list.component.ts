import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CryptoService } from '../../services/crypto.service';
import { Crypto } from '../../shared/types/crypto';
import { of } from 'rxjs';

@Component({
  selector: 'crypto-track-list',
  standalone: true,
  imports: [CommonModule,  MatListModule, MatIconModule],
  template: `
    <mat-list>
      @for (crypto of cryptos$ | async; track crypto) {
        <mat-list-item>
          <mat-icon matListItemIcon>folder</mat-icon>
          <h3 matListItemTitle>{{crypto.name}}</h3>
          <p matListItemLine>
            <span>{{crypto.symbol}}</span>
            <span class="demo-2"> -- {{crypto.market_cap_usd}}</span>
          </p>
        </mat-list-item>
      }
    </mat-list>
  `,
  styleUrl: './list.component.scss',
  
})
export class ListComponent implements OnInit {

  cryptos: Crypto[] = [];
  cryptos$ = of<Crypto[]>([]);


  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.cryptos$ = this.cryptoService.listAllCryptos();
  }
}
