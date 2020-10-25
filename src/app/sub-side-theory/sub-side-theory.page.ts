import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sub-side-theory',
  templateUrl: './sub-side-theory.page.html',
  styleUrls: ['./sub-side-theory.page.scss'],
})
export class SubSideTheoryPage implements OnInit {

  data = []
  loading: boolean;

  constructor(
    private router: Router,
    public dataService: DataService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.data = ['Materi 1', 'Materi 2', 'Materi 3', 'Materi 4', 'Materi 5', 'Materi 6', 'Materi 7', 'Materi 8', 'Materi 9', 'Materi 10', 'Materi 11', 'Materi 12', 'Materi 13', 'Materi 14', 'Materi 15', 'Materi 16' ]
  }

  goSubDetails(id, title) {
    this.router.navigate(['sub-side-theory-details',{id: id, title: title}])
  }
}
