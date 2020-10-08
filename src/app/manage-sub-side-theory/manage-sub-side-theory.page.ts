import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-sub-side-theory',
  templateUrl: './manage-sub-side-theory.page.html',
  styleUrls: ['./manage-sub-side-theory.page.scss'],
})
export class ManageSubSideTheoryPage implements OnInit {

  id: number
  materi: string
  data = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id")
    this.materi = this.route.snapshot.paramMap.get("title")

    this.data = ['Sub Materi 1', 'Sub Materi 2', 'Sub Materi 3', 'Sub Materi 4', 'Sub Materi 5', 'Sub Materi 6', 'Sub Materi 7', 'Sub Materi 8', 'Sub Materi 9', 'Sub Materi 10', 'Sub Materi 11', 'Sub Materi 12', 'Sub Materi 13', 'Sub Materi 14', 'Sub Materi 15', 'Sub Materi 16' ]
  }

  edit(id) {
    this.router.navigate(['edit-sub-side-theory',{id: id}])
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
