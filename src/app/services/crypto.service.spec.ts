import { TestBed } from '@angular/core/testing';
import { CryptoService } from './crypto.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GlobalStats, Crypto, CryptoResponse } from '../shared/types/crypto';
import { HttpTestingController } from '@angular/common/http/testing';
import { Market } from '../shared/types/market';
import { Social } from '../shared/types/social';
import { generateUrl } from '../shared/helpers/generate-url';

describe('CryptoService', () => {
  let service: CryptoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CryptoService
      ]
    });
    service = TestBed.inject(CryptoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all cryptos in listAllCryptos', () => {
    const mockResponse: CryptoResponse = {
      data: [{
        id: "1",
        symbol: "BTC",
        name: "Bitcoin",
        nameid: "bitcoin",
        rank: 1,
        price_usd: "100000",
        percent_change_24h: "1",
        percent_change_1h: "1",
        percent_change_7d: "1",
        price_btc: "1",
        market_cap_usd: "1",
        volume_24h: 1,
        volume_24a: 1,
        csupply: "1",
        tsupply: "1",
        msupply: "1",
      }],
      info: {
        coins_num: 1,
        time: 1,
      },
    };

    service.listAllCryptos().subscribe((cryptos) => {
      expect(cryptos).toEqual(mockResponse.data);
    });

    const req = httpMock.expectOne(`${generateUrl('/tickers/')}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors in listAllCryptos', () => {
    const errorMessage = 'Server error';

    service.listAllCryptos().subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${generateUrl('/tickers/')}`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch coin market cap in listCryptoById', () => {
    const mockResponse: CryptoResponse = {
      data: [{
        id: "1",
        symbol: "BTC",
        name: "Bitcoin",
        nameid: "bitcoin",
        rank: 1,
        price_usd: "100000",
        percent_change_24h: "1",
        percent_change_1h: "1",
        percent_change_7d: "1",
        price_btc: "1",
        market_cap_usd: "1",
        volume_24h: 1,
        volume_24a: 1,
        csupply: "1",
        tsupply: "1",
        msupply: "1",
      }],
      info: {
        coins_num: 1,
        time: 1,
      },
    };

    service.listCryptoById("1").subscribe((cryptos) => {
      expect(cryptos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${generateUrl('/ticker/?id=1')}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors in listCryptoById', () => {
    const errorMessage = 'Server error';

    service.listCryptoById("1").subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${generateUrl('/ticker/?id=1')}`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch global stats in listGlobal', () => {
    const mockResponse: GlobalStats[] = [{
      coins_count: 1,
      active_markets: 1,
      total_volume: 1,
      btc_d: "1",
      eth_d: "1",
      mcap_change: "1",
      volume_change: "1",
      avg_change_percent: "1",
      volume_ath: 1,
      mcap_ath: 1,
    }];

    service.listGlobal().subscribe((stats) => {
      expect(stats).toEqual(mockResponse[0]);
    });

    const req = httpMock.expectOne(`${generateUrl('/global')}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors in listGlobal', () => {
    const errorMessage = 'Server error';

    service.listGlobal().subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${generateUrl('/global')}`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch coin market cap in listCoinMarketCap', () => {
    const mockResponse: Market[] = [{
      name: "",
      base: "",
      quote: "",
      price: 1,
      price_usd: 1,
      volume: 1,
      volume_usd: 1,
      time: 1,
    }];

    service.listCoinMarketCap("1").subscribe((markets) => {
      expect(markets).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${generateUrl('/markets/?id=1')}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors in listCoinMarketCap', () => {
    const errorMessage = 'Server error';

    service.listCoinMarketCap("1").subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${generateUrl('/markets/?id=1')}`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch coin social in listCoinSocial', () => {
    const mockResponse: Social = {
      reddit: {
        avg_active_users: 1,
        subscribers: 1,
      },
      twitter: {
        status_count: 1,
        followers_count: 1,
      },
    };

    service.listCoinSocial("1").subscribe((socials) => {
      expect(socials).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${generateUrl('/social_stats/?id=1')}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors in listCoinSocial', () => {
    const errorMessage = 'Server error';

    service.listCoinSocial("1").subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${generateUrl('/social_stats/?id=1')}`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});