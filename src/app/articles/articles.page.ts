import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  data = []
  page = 1;
  loading = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.loading = true;
    this.page = 1;
    this.data = [];
    this.getArticles();
  }

  ionViewWillEnter() {
  }

  async getArticles() {
    const url = 'api/article?page=' + this.page;
    this.dataService.httpGet(url)
    .then(
      async result => {
        if (result['data'].length > 0) {
          this.data = this.data.concat(result['data']);
          this.page++;
        }
        this.loading = false;
      }
    );
  }

  async doRefresh(event) {
    this.page = 1;
    this.data = [];
    this.loading = true;
    await this.getArticles();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  async doInfinite(event) {
    if (this.data.length !== 0) {
      await this.getArticles();
    }
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  details(id) {
    this.router.navigate(['article-details',{id: id}])
  }
}
