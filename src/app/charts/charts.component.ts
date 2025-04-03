import { Component, Input, OnChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Tweet } from '../tweet.model';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnChanges {
  @Input() tweets: Tweet[] = [];
  sentimentChart: Chart<"pie", number[], string> | undefined;

  ngOnChanges(): void {
    if (this.tweets && this.tweets.length > 0) {
      this.createChart();
    }
  }

  createChart(): void {
    const sentimentCounts = { Positive: 0, Negative: 0, Neutral: 0 };
    this.tweets.forEach(tweet => {
      if (tweet.sentiment in sentimentCounts) {
        sentimentCounts[tweet.sentiment]++;
      }
    });

    const chartData = [sentimentCounts.Positive, sentimentCounts.Negative, sentimentCounts.Neutral];

    const canvas = document.getElementById('sentimentChart') as HTMLCanvasElement;
    if (this.sentimentChart) {
      this.sentimentChart.destroy();
    }
  
    this.sentimentChart = new Chart<"pie", number[], string>(canvas, {
      type: 'pie',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          data: chartData,
          backgroundColor: ['#4caf50', '#f44336', '#ffeb3b']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Sentiment Distribution'
          }
        }
      }
    });
  }
}