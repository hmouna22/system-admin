import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:3000/asset'; // The backend URL

  constructor(private http: HttpClient) {}

  getAssets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
