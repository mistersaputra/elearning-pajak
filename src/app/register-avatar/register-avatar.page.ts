import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController  } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload/upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

const { Camera } = Plugins;

@Component({
  selector: 'app-register-avatar',
  templateUrl: './register-avatar.page.html',
  styleUrls: ['./register-avatar.page.scss'],
})

export class RegisterAvatarPage implements OnInit {
  @ViewChild('fileInp', {static: false}) fileInput: ElementRef;
  @Input() label: string;
  @Output() data = new EventEmitter<FormData>();

  loading: any;
  file: any;
  response: any;
  onupload = false;
  btndisabled = true;
  actionSheet: any;

  public UploadPhoto = [];
  public photos = {statusUpload: '', image: '', file: new File([],''), progressUpload: 0};
  public base64Image: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private dataService: DataService,
    private router: Router,
    private alertCtrl: AlertController,
    private uploadService: UploadService,
    private formData: FormData
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.formData = new FormData();
    this.formData.append('role_id', this.dataService.getData('role_id'));
    this.formData.append('name', this.dataService.getData('name'));
    this.formData.append('email', this.dataService.getData('email'));
    this.formData.append('password', this.dataService.getData('password'));
    this.formData.append('password_confirmation', this.dataService.getData('password_confirmation'));
    this.formData.append('phone', this.dataService.getData('phone'));
    this.formData.append('gender', this.dataService.getData('gender'));
    this.formData.append('address', this.dataService.getData('address'));
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
            document.getElementById('files').click();
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

  async onSubmit() {
    if (this.photos.image !== '') {
      this.onupload = true;
      if (this.photos.statusUpload === 'hold' || this.photos.statusUpload === 'error') {
        this.photos.statusUpload = 'waitingupload';
      }
      if (this.photos.statusUpload === 'waitingupload') {
        this.btndisabled = true;
        await this.postImage();
      }
      this.onupload = false;
    } else {
        await this.dataService.presentAlert('', 'No photo found');
    }
  }

  postImage() {
    const promise = new Promise((resolve, reject) => {
      this.photos.statusUpload = 'upload';
      const url = 'api/register';
      this.formData.append('avatar', this.photos.file);
      this.uploadService.uploadFile(
        this.formData,
        url
      ).subscribe(async (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.photos.progressUpload = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            var result = JSON.parse(event.body);
            if (+result.status_code === 200) {
              this.photos.statusUpload = 'success';
              await this.dataService.presentAlert('Register Berhasil', 'Silakan login dengan email dan password anda');
              this.router.navigate(['/login']);
            } else {
              this.photos.statusUpload = 'error';
              await this.dataService.presentAlert('', result.message);
              this.photos.progressUpload = 0;
              this.btndisabled = false;
            }
            resolve(result);
        }
      },
      async (error: any) => {
        this.photos.statusUpload = 'error';
        this.btndisabled = false;
        await this.dataService.presentToast('You seem to be offline');
        resolve(error);
      });
    });

    return promise;
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
  
      this.base64Image = selectimage.base64String.replace(/(\r\n|\n|\r)/gm, '');
      const imageBlob = this.dataURItoBlob(this.base64Image);
      const fileImage = new File(
        [imageBlob],
        'camera.'+selectimage.format,
        { type: 'image/'+selectimage.format }
      );
      this.photos = {statusUpload: 'hold', image: this.base64Image, file: fileImage, progressUpload: 0};
      this.btndisabled = false;
      this.actionSheet.dismiss();
    } catch (e) {
      await this.dataService.presentToast('Tidak dapat membuka kamera');
    }

  }

  async deletePhoto() {
    const confirm = await this.alertCtrl.create({
      header: 'Apakah anda yakin ingin menghapus foto ini',
      message: '',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.photos = {statusUpload: '', image: '', file: new File([],''), progressUpload: 0};
          }
        }
      ]
    });

    await confirm.present();
  }

  getBase64(obj: any) {
    const reader = new FileReader();
    reader.onloadend = function() {
      const blob = reader.result;
      const base64Image = blob.toString().split(',')[1];
      const imageBlob = obj.dataURItoBlob(base64Image);
      const fileImage = new File(
        [imageBlob], 
        obj.file[0].name,
        { type: obj.file[0].type }
      );
      obj.base64Image = base64Image;
      obj.photos = {statusUpload: 'hold', image: base64Image, file: fileImage, progressUpload: 0};
      obj.btndisabled = false;
    };
    reader.readAsDataURL(this.file[0]);
  }

  onChange(event: any) {
    const temp = this.file;
    this.file = event.srcElement.files;
    if (this.file.length > 0) {
      if (this.file[0].name.match(/.(jpg|jpeg|png|gif|bmp|svg|webp)$/i)) {
        if (this.file[0].size < (4000 * 1024)) {
          this.getBase64(this);
        } else {
          this.dataService.presentAlert('', 'File terlalu besar');
          this.file = temp;
        }
      } else {
        this.dataService.presentAlert('', 'Bukan file foto');
        this.file = temp;
      }
    } else {
      this.file = temp;
    }
  }
}