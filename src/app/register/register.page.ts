import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  myForm: FormGroup;
  passwordNotMatch = false;
  type = 'password';
  type_r = 'password';
  submitAttempt = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.myForm = this.formBuilder.group({
      role_id: ['2', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])],
      password_confirmation: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])],
      phone: ['', Validators.maxLength(20)],
      gender: [''],
      address: [''],
      avatar: ['']
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem('lms_token')) {
      this.router.navigate(['/home']);
    }
  }

  checkPassword() {
    if (this.myForm.controls.password.value === this.myForm.controls.password_confirmation.value) {
      this.passwordNotMatch = false;
    } else {
      if (this.myForm.controls.password_confirmation.valid) {
        this.passwordNotMatch = true;
      } else {
        this.passwordNotMatch = false;
      }
    }
  }

  revealPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  revealRpassword() {
    if (this.type_r === 'password') {
      this.type_r = 'text';
    } else {
      this.type_r = 'password';
    }
  }

  next() {
    this.submitAttempt = true;
    if (this.myForm.valid) {
      this.dataService.setData('role_id', this.myForm.controls.role_id.value);
      this.dataService.setData('name', this.myForm.controls.name.value);
      this.dataService.setData('email', this.myForm.controls.email.value);
      this.dataService.setData('password', this.myForm.controls.password.value);
      this.dataService.setData('password_confirmation', this.myForm.controls.password_confirmation.value);
      this.dataService.setData('phone', this.myForm.controls.phone.value);
      this.dataService.setData('gender', this.myForm.controls.gender.value);
      this.dataService.setData('address', this.myForm.controls.address.value);
      this.router.navigate(['/register-avatar']);
    } else {
      this.dataService.presentToast('Make sure you fill all fields');
    }
  }

  async register() {
    this.submitAttempt = true;
    if (this.myForm.valid) {
      const body = JSON.stringify(this.myForm.value);
      const url = 'api/Register';
      this.dataService.httpPost(body, url, true)
      .then(
        async data => {
          if (data['responcode'] === 202) {
            localStorage.setItem('pajak_id_token', data['id_token']);
            localStorage.setItem('pajak_name', data['name']);

            this.router.navigate(['/home']);
          } else {
            await this.dataService.presentAlert('', data['message']);
          }
        }
      );
    } else {
      await this.dataService.presentToast('Make sure you fill all fields');
    }
  }

}