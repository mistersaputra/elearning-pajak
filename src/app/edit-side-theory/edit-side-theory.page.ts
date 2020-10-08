import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-edit-side-theory',
  templateUrl: './edit-side-theory.page.html',
  styleUrls: ['./edit-side-theory.page.scss'],
})
export class EditSideTheoryPage implements OnInit {
  myForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.myForm = this.formBuilder.group({
      judul: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async save() {
    if (this.myForm.valid) {
      const body = JSON.stringify(this.myForm.value);
      const url = 'api/savemateri';
      this.dataService.httpPost(body, url, true)
      .then(
        async data => {
          if (data['responcode'] === 202) {
            await this.dataService.presentToast('Data have been saved!', 'bottom');
          } else {
            await this.dataService.presentAlert('', data['message']);
          }
        }
      );
    } else {
      await this.dataService.presentAlert('', 'Make sure you fill all fields');
    }
  }
}
