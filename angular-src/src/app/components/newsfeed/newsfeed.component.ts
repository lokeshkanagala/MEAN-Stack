import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
  providers: [NewsService]
})
export class NewsfeedComponent implements OnInit {

  id: string;
  source: any;
  newsFeeds: any;

  constructor(private route: ActivatedRoute, private news: NewsService) { }

  ngOnInit() {
    this.source = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log("Getting Channel - " + this.id);
    this.news.loadNewsFeeds(this.id).subscribe(res => {
      this.newsFeeds = res;
      console.log(this.newsFeeds);
    })
  }

  ngOnDestroy() {
    this.source.unsubscribe();
  }

}
