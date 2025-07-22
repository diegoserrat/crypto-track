import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Crypto, GlobalStats } from '../shared/types/crypto';
import { Market } from '../shared/types/market';
import { Social } from '../shared/types/social';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = environment.coinloreBaseUrl;

  constructor(private http: HttpClient) { }

  listAllCryptos() {
    return this.http.get<Crypto[]>(`${this.apiUrl}/ticker`);
  }

  listCryptoById(id: string) {
    return this.http.get<Crypto[]>(`${this.apiUrl}/ticker/?id=${id}`);
  }

  listGlobal() {
    return this.http.get<GlobalStats[]>(`${this.apiUrl}/global`).pipe(map(res => res[0]));
  }

  listCoinMarketCap(id: string) {
    return this.http.get<Market[]>(`${this.apiUrl}/markets/?id=${id}`);
  }

  listCoinSocial(id: string) {
    return this.http.get<Social>(`${this.apiUrl}/social_stats/?id=${id}`);
  }
}
