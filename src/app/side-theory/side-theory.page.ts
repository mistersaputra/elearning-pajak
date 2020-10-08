import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-side-theory',
  templateUrl: './side-theory.page.html',
  styleUrls: ['./side-theory.page.scss'],
})
export class SideTheoryPage implements OnInit {

  data = []

  constructor(
    private router: Router,
    private dataService: DataService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.data = ['Mateadad adadadriadadaw 1', 'Materi 2', 'adawdadc adwada adawd adawdMateri 3', 'adawdwadMa adadad afesfff adadteri 4', 'Materi 5', 'Materi 6', 'Materi 7', 'Materi 8', 'Materiadawdad 9', 'Materi 10', 'Matadadwada adadadadwwada adderi 11', 'Matadawdad adadadaderi 12', 'Matadawderi 13', 'Matadwad adaadad adaddweri 14', 'Materi 15', 'Mateadad awdada ri 16' ]
  }

  goSub(id, title) {
    this.router.navigate(['sub-side-theory',{id: id, title: title}])
  }
}
