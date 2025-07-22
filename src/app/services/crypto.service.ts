import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CryptoResponse, GlobalStats, Crypto } from '../shared/types/crypto';
import { Market } from '../shared/types/market';
import { Social } from '../shared/types/social';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { generateUrl } from '../shared/helpers/generate-url';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  listAllCryptos() : Observable<Crypto[]> {
    return this.http.get<CryptoResponse>(generateUrl('/tickers/'))
      .pipe(
        tap(response => console.log('✅ Resposta recebida:', response)),
        map(response => response.data),
      );
  }

  listCryptoById(id: string) : Observable<CryptoResponse> {
    return this.http.get<CryptoResponse>(generateUrl(`/ticker/?id=${id}`));
  }

  listGlobal() : Observable<GlobalStats> {
    return this.http.get<GlobalStats[]>(generateUrl('/global')).pipe(map(res => res[0]));
  }

  listCoinMarketCap(id: string) : Observable<Market[]> {
    return this.http.get<Market[]>(generateUrl(`/markets/?id=${id}`));
  }

  listCoinSocial(id: string) : Observable<Social> {
    return this.http.get<Social>(generateUrl(`/social_stats/?id=${id}`));
  }
}
