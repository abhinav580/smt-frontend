import { Component, OnInit } from '@angular/core';
import { Tweet } from './tweet.model';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tweets: Tweet[] = [];
  loading: boolean = false;

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.loadTweets();
  }

  loadTweets(keyword?: string): void {
    this.loading = true; // Start loading
    this.tweetService.getTweets(keyword).subscribe(data => {
      this.tweets = data;
      this.loading = false; // Stop loading
    }, error => {
      this.loading = false; // Stop loading on error
      console.error('Error loading tweets:', error);
    });
  }

  onSearch(keyword: string): void {
    this.loadTweets(keyword);
  }
}