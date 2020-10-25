import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
  public id;
  title: string;
  description: string;
  featured_image: string;
  article_images = [];
  article_status_id: number;
  loading: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    public dataService: DataService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.id) {
      // this.loading = true;
      // this.getData();
      this.featured_image = "assets/img/map.png";
      this.title = "Judul Artikel Panjang Harus Turun ke Bawah";
      this.description = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ad debitis reprehenderit? Laudantium nostrum quas nisi quos, esse ad neque numquam saepe ratione veniam, quidem quisquam perferendis exercitationem labore suscipit? <br> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ad debitis reprehenderit? Laudantium nostrum quas nisi quos, esse ad neque numquam saepe ratione veniam, quidem quisquam perferendis exercitationem labore suscipit? <br> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ad debitis reprehenderit? Laudantium nostrum quas nisi quos, esse ad neque numquam saepe ratione veniam, quidem quisquam perferendis exercitationem labore suscipit? <br> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ad debitis reprehenderit? Laudantium nostrum quas nisi quos, esse ad neque numquam saepe ratione veniam, quidem quisquam perferendis exercitationem labore suscipit? <br>";
      this.article_images = [
        {"title": 'image 1', "image": "assets/img/map.png"},
        {"title": 'image 2', "image": "assets/img/map.png"},
        {"title": 'image 3', "image": "assets/img/map.png"},
        {"title": 'image 4', "image": "assets/img/map.png"},
      ]
    } else {
      this.router.navigate(['/home']);
    }
  }

  async getData() {
    const url = 'api/article_details/'+this.id;
    this.dataService.httpGet(url)
    .then(
      async data => {
        this.title = data['Title'];
        this.description = data['Description'];
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
}