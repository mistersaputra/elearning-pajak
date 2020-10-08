import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm: FormGroup;
  type = 'password';
  submitAttempt = false;
  public unsubscribeBackEvent: any;
  counter = 0;

  constructor(
    public platform: Platform,
    private router: Router,
    public formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem('lms_token')) {
      this.router.navigate(['/home']);
    }
    
    this.initializeBackButtonCustomHandler();
  }
  
  revealPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  async login() {
    this.submitAttempt = true;
    if (this.myForm.valid) {
      const body = JSON.stringify(this.myForm.value);
      const url = 'api/login';
      this.dataService.httpPost(body, url, true)
      .then(
        async data => {
          if (data['status_code'] === 200) {
            localStorage.setItem('lms_token', data['access_token']);
            this.getProfile();
          } else {
            await this.dataService.presentAlert('', data['message']);
          }
        }
      );
    } else {
      await this.dataService.presentAlert('', 'Make sure you fill all fields');
    }
  }

  async getProfile() {
    const body = JSON.stringify({
      token: localStorage.getItem('lms_token')
    });
    const url = 'api/profile';
    this.dataService.httpGet(url, true)
    .then(
      async data => {
        if (data['message'] == 'success') {
          const profile = data['data'];
          localStorage.setItem('lms_id', profile['id']);
          localStorage.setItem('lms_name', profile['name']);
          localStorage.setItem('lms_role', profile['role_id']);
          this.router.navigate(['/home']);
        } else {
          await this.dataService.presentAlert('', data['message']);
        }
      }
    );
  }

  ionViewWillLeave() {
    this.unsubscribeBackEvent.unsubscribe();
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