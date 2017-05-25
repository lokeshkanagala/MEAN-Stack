import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

    private newUrl: string;
    
    constructor(private http: Http) {

    }

    loadChannels(category: string) {
        if(category == 'none' || undefined || null) {
            this.newUrl = "https://newsapi.org/v1/sources?language=en";
            return this.http.get(this.newUrl).map(res => res.json());
        } else {
            this.newUrl = 'https://newsapi.org/v1/sources?language=en&country=us&category=' + category;
            return this.http.get(this.newUrl).map(res => res.json());
        }     
    }

    loadNewsFeeds(id: string) {
        this.newUrl = 'https://newsapi.org/v1/articles?source=' + id + '&sortBy=top&apiKey=a50a5089e3214ec9b62359d80004dec4';
        return this.http.get(this.newUrl).map(res => res.json());
    }

}