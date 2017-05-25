import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ NewsService ]
})
export class DashboardComponent implements OnInit {
newsJson: any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.loadChannels('none').subscribe(res => {
      this.newsJson = res;
      console.log(this.newsJson);
    });
  }

  loadNews(category: string) {
    this.newsService.loadChannels(category).subscribe(res => {
      this.newsJson = res;
      console.log(this.newsJson);
    });
  }
}
