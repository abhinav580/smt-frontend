import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  // Adjust the API URL if needed.
  private apiUrl = 'http://localhost:8000/api/tweets/';

  constructor(private http: HttpClient) { }

  getTweets(keyword?: string): Observable<Tweet[]> {
    let url = this.apiUrl;
    if (keyword) {
      url += '?keyword=' + keyword;
    }
    return this.http.get<Tweet[]>(url);
  }
}