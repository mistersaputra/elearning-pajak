import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.page.html',
  styleUrls: ['./manage-articles.page.scss'],
})
export class ManageArticlesPage implements OnInit {
  data = []
  page = 1;
  loading = false;

  constructor(
    private router: Router,
    private dataService: DataService,
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
    this.router.navigate(['articles-details',{id: id}])
  }

  edit(id) {
    this.router.navigate(['edit-articles',{id: id}])
  }

  async hapus(id) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Hapus',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

  info() {
    this.dataService.presentAlert('Tips', 'Swipe ke kiri untuk mengedit dan menghapus item!')
  }
}
