import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController  } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload/upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalAddImageComponent } from '../modal-add-image/modal-add-image.component';

const { Camera } = Plugins;

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.page.html',
  styleUrls: ['./add-articles.page.scss'],
})
export class AddArticlesPage implements OnInit {
  @ViewChild('fileInp', {static: false}) fileInput: ElementRef;
  @Input() label: string;
  @Output() data = new EventEmitter<FormData>();
  
  myForm: FormGroup;
  actionSheet: any;
  base64Image = 'assets/img/notselected.png';
  loading: any;
  files: any;
  article_images = [];
  photo = { title: '', base64Image: '', image: new File([],'') };
  submitAttempt = false;
  
  private _htmlProperty: string = '<progress></progress>';

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private dataService: DataService,
    private router: Router,
    private alertCtrl: AlertController,
    private uploadService: UploadService,
    private formData: FormData,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
  ) {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      featured_image: [''],
      article_images: [''],
      article_status_id: ['2', Validators.required]
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
      this.base64Image = 'data:image/jpeg;base64,'+selectimage.base64String.replace(/(\r\n|\n|\r)/gm, '');
      const imageBlob = this.dataURItoBlob(base64string);
      const fileImage = new File(
        [imageBlob],
        'camera.'+selectimage.format,
        { type: 'image/'+selectimage.format }
      );
      this.myForm.controls.featured_image.setValue(fileImage);
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
      obj.base64Image = 'data:image/jpeg;base64,'+base64Image;
      obj.myForm.controls.featured_image.setValue(fileImage);
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

  async addImage() {
    const modal = await this.modalCtrl.create({
      component: ModalAddImageComponent,
    });

    await modal.present();
    
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.photo = {
        title: data.title,
        image: data.image,
        base64Image: data.base64Image
      }
      this.article_images.push(this.photo);
      this.myForm.controls.article_images.setValue(this.article_images);
    }
  }

  async submit() {
    this.submitAttempt = true;
    // console.log(this.myForm.value)
    if (this.myForm.valid) {
      this.formData = new FormData();
      this.formData.append('title', this.myForm.controls.title.value);
      this.formData.append('description', this.myForm.controls.description.value);
      this.formData.append('featured_image', this.myForm.controls.featured_image.value);
      this.formData.append('article_status_id', this.myForm.controls.article_status_id.value);
      this.article_images.forEach( (item, index) => {
        this.formData.append('article_images['+index+'][title]', item.title);
        this.formData.append('article_images['+index+'][image]', item.image);
      });
      this.dataService.presentLoadingDefault();
      await this.post();
      this.dataService.endLoadingDefault();
    } else {
      await this.dataService.presentAlert('Warning', 'Lengkapi data!');
    }
  }

  post() {
    const promise = new Promise((resolve, reject) => {
      const url = 'api/article/store';
      this.uploadService.uploadFile(
        this.formData, url, true
      ).subscribe(async (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // console.log(Math.round(event.loaded / event.total * 100));
            break;
          case HttpEventType.Response:
            var result = JSON.parse(event.body);
            if (+result.status_code === 200) {
              await this.dataService.presentToast('Berhasil menambah artikel');
              this.router.navigate(['/home']);
            } else {
              await this.dataService.presentAlert('', result.message);
            }
            resolve(result);
        }
      },
      async (error: any) => {
        await this.dataService.presentToast('You seem to be offline');
        resolve(error);
      });
    });

    return promise;
  }
}
