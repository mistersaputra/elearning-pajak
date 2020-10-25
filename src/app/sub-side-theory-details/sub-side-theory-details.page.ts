import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sub-side-theory-details',
  templateUrl: './sub-side-theory-details.page.html',
  styleUrls: ['./sub-side-theory-details.page.scss'],
})
export class SubSideTheoryDetailsPage implements OnInit {

  data: any;
  loading: boolean;

  constructor(
    private router: Router,
    public dataService: DataService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

}
