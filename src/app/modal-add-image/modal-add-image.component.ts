import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController  } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload/upload.service';
import { NavParams, ModalController } from '@ionic/angular';

const { Camera } = Plugins;

@Component({
  selector: 'app-modal-add-image',
  templateUrl: './modal-add-image.component.html',
  styleUrls: ['./modal-add-image.component.scss'],
})
export class ModalAddImageComponent implements OnInit {
  @ViewChild('fileInp', {static: false}) fileInput: ElementRef;
  @Input() label: string;
  @Output() data = new EventEmitter<FormData>();
  
  myForm: FormGroup;
  actionSheet: any;
  files: any;
  photo = { title: '', base64Image: 'assets/img/notselected.png', image: new File([],'') };
  submitAttempt = false;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private dataService: DataService,
    private alertCtrl: AlertController,
    private uploadService: UploadService,
    private formData: FormData,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController
  ) {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async presentActionSheet() {
    this.actionSheet = await this.actionSheetCtrl.create({
      header: 'Select image source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Explore',
          handler: () => {
            document.getElementById('filesImage').click();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await this.actionSheet.present();
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
  }

  async openCamera() {
    try {
      const selectimage = await Camera.getPhoto({
        quality: 90,
        width: 800,
        correctOrientation: true,
        resultType: CameraResultType.Base64,
        saveToGallery: true,
        source: CameraSource.Camera
      });
  
      const base64string = selectimage.base64String.replace(/(\r\n|\n|\r)/gm, '');
      const imageBlob = this.dataURItoBlob(base64string);
      const fileImage = new File(
        [imageBlob],
        'camera.'+selectimage.format,
        { type: 'image/'+selectimage.format }
      );
      this.photo.image = fileImage;
      this.photo.base64Image = 'data:image/jpeg;base64,'+selectimage.base64String.replace(/(\r\n|\n|\r)/gm, '');
      this.myForm.controls.image.setValue(fileImage);
      this.actionSheet.dismiss();
    } catch (e) {
      await this.dataService.presentToast('Tidak dapat membuka kamera');
    }
  }

  getBase64(obj: any) {
    const reader = new FileReader();
    reader.onloadend = function() {
      const blob = reader.result;
      const base64Image = blob.toString().split(',')[1];
      const imageBlob = obj.dataURItoBlob(base64Image);
      const fileImage = new File(
        [imageBlob], 
        obj.files[0].name,
        { type: obj.files[0].type }
      );
      obj.photo.base64Image = 'data:image/jpeg;base64,'+base64Image;
      obj.photo.image = fileImage;
      obj.myForm.controls.image.setValue(fileImage);
    };
    reader.readAsDataURL(this.files[0]);
  }

  onChange(event: any) {
    const temp = this.files;
    this.files = event.srcElement.files;
    if (this.files.length > 0) {
      if (this.files[0].name.match(/.(jpg|jpeg|png|gif|bmp|svg|webp)$/i)) {
        if (this.files[0].size < (4000 * 1024)) {
          this.getBase64(this);
        } else {
          this.dataService.presentAlert('File terlalu besar', 'Maksimal 4 MB.');
          this.files = temp;
        }
      } else {
        this.dataService.presentAlert('', 'Bukan file foto');
        this.files = temp;
      }
    } else {
      this.files = temp;
    }
  }

  save() {
    this.submitAttempt = true;
    if (this.myForm.valid) {
      this.photo.title = this.myForm.controls.title.value;
      this.modalCtrl.dismiss(this.photo);
    }
  }
  
  closeModalCancel() {
    this.modalCtrl.dismiss(null);
  }

}
