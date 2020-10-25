import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-side-theory',
  templateUrl: './manage-side-theory.page.html',
  styleUrls: ['./manage-side-theory.page.scss'],
})
export class ManageSideTheoryPage implements OnInit {
  loading: boolean;
  data = []

  constructor(
    private router: Router,
    private dataService: DataService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.data = ['Materi 1', 'Materi 2', 'Materi 3', 'Materi 4', 'Materi 5', 'Materi 6', 'Materi 7', 'Materi 8', 'Materi 9', 'Materi 10', 'Materi 11', 'Materi 12', 'Materi 13', 'Materi 14', 'Materi 15', 'Materi 16' ]
  }

  goSub(id, title) {
    this.router.navigate(['manage-sub-side-theory',{id: id, title: title}])
  }

  edit(id) {
    this.router.navigate(['edit-side-theory',{id: id}])
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
