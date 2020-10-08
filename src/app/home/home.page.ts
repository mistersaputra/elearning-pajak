import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public unsubscribeBackEvent: any;
  counter = 0;
  role: number;

  constructor(
    public platform: Platform,
    private router: Router,
    private dataService: DataService
  ) {}

  ionViewWillEnter() {
    if (localStorage.getItem('lms_role')) {
      this.role = +localStorage.getItem('lms_role');
    }
    
    this.initializeBackButtonCustomHandler();
  }
  
  ionViewWillLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }

  async logout() {
    if (localStorage.getItem('lms_token') !== null) {
      localStorage.removeItem('lms_token');
      localStorage.removeItem('lms_id');
      localStorage.removeItem('lms_name');
      localStorage.removeItem('lms_role');
    }
  }


  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(1,  () => {
      if (this.counter === 0) {
        this.counter++;
        this.dataService.presentToast('Press again to exit', 'bottom');
        setTimeout(() => { this.counter = 0; }, 3000);
      } else {
        navigator['app'].exitApp();
      }
    });
  }

}
