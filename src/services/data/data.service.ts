import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, ToastController, PopoverController, Platform } from '@ionic/angular';
import { retry } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];
  private loading: any;
  toast: any;
  URL_BASE = 'https://lms-pajak.bosjuragan.com/';

  constructor(
    private platform: Platform,
    public http: HttpClient,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController
  ) { }

  setData(id, value) {
    this.data[id] = value;
  }

  getData(id) {
    return this.data[id];
  }

  getAppVersion() {
    if (this.platform.is('android')) {
      return '1.0.0';
    } else if (this.platform.is('ios')) {
      return '1.0.0';
    } else {
      return 'web';
    }
  }

  playSoundNotif() {
    const audio = new Audio();
    audio.src = 'assets/mp3/notif.mp3';
    audio.load();
    audio.play();
  }

  async httpPost(body, url, loading = false, onlyretry = false, noalert = false) {
    const promise = new Promise((resolve, reject) => {
      this.http_('post', body, url, loading, onlyretry, noalert).then(
      data => {
        resolve(data);
      },
      err => {
        reject(err);
      });
    });
    return promise;
  }

  async httpGet(url, loading = false, onlyretry = false, noalert = false) {
    const promise = new Promise((resolve, reject) => {
      this.http_('get', '', url, loading, onlyretry, noalert).then(
      data => {
        resolve(data);
      },
      err => {
        reject(err);
      });
    });
    return promise;
  }

  async http_(method = 'post', body, url, loading = false, onlyretry = false, noalert = false) {
    if (loading) {
      await this.presentLoadingDefault();
    }
    const promise = new Promise((resolve, reject) => {
      let Authorization = 'None';
      if (localStorage.getItem('lms_token') !== null && localStorage.getItem('lms_token') !== undefined) {
        Authorization =  'Bearer '+localStorage.getItem('lms_token');
      }

      const httpHeaders_ = {
        headers: new HttpHeaders({
          'Accept':  'application/json',
          'Content-Type': 'application/json',
          'Authorization': Authorization
        })
      };

      this.http[method](this.URL_BASE + url, (method === 'post' ? body : httpHeaders_), (method === 'post' ? httpHeaders_ : ''))
      .pipe(
        retry(5)
      )
      .subscribe(
        async data => {
          if (loading) {
            await this.endLoadingDefault();
          }
          resolve(data);
        },
        async error => {
          if (loading) {
            await this.endLoadingDefault();
          }
          if (!noalert) {
            this.presentAlertRetry(method, body, url, loading, onlyretry).then(
              data => {
                resolve(data);
              },
              err => {
                reject(err);
              }
            );
          }
        }
      );
    });

    return promise;
  }

  presentAlertRetry(method, body, url, loading, onlyretry) {
    const promise = new Promise(async (resolve, reject) => {
      const message = 'Check your internet connection';
      const subject = 'You seem to be offline';
      let buttons =  [  { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
                          handler: () => {
                            reject('Cancel');
                          }
                        },
                        { text: 'Retry', cssClass: 'primary',
                          handler: () => {
                            this.http_(method, body, url, loading, onlyretry).then(
                              data => {
                                resolve(data);
                              },
                              error => {
                                reject(error);
                              }
                            );
                          }
                        }
                      ];
      if (onlyretry) {
        buttons =  [
          {
            text: 'Retry', cssClass: 'primary',
            handler: () => {
              this.http_(method, body, url, loading, onlyretry).then(
                data => {
                  resolve(data);
                },
                error => {
                  reject(error);
                }
              );
            }
          }
        ];
      }
      const alert = await this.alertCtrl.create({
          header: subject,
          message: message,
          buttons: buttons
      });
      await alert.present();
    });

    return promise;
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getTimeZone() {
    const d = new Date().getTimezoneOffset();
    let tz = Math.floor(Math.abs(d) / 60) + ':' + Math.abs(d) % 60;
    tz = d < 0 ? '+' + tz : '-' + tz;
    return tz;
  }

  async presentToast(message: string, position_ = 'top', closeBtn = false) {
    try {
      this.toast.dismiss();
    } catch (e) {}
    this.toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position_ === 'bottom' ? 'bottom' : (position_ === 'middle' ? 'middle' : 'top'),
      cssClass: position_ === 'bottom' ? 'tabs-bottom' : ''
    });
    this.toast.present();
  }

  async presentAlert(subject: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: subject,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async presentLoadingDefault() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent'
    });
    return await this.loading.present();
  }

  async endLoadingDefault() {
    return await this.loading.dismiss();
  }

  imageDefault(event) {
    event.srcElement.src = 'assets/img/blank_40_40.png';
    this.imageLoad(event);
  }

  imageLoad(event) {
    let ParentClass = event.srcElement.parentElement.className;
    ParentClass = ParentClass.replace('image-placeholder', '');
    event.srcElement.parentElement.className = ParentClass;
    let ImgClass = event.srcElement.className;
    ImgClass = ImgClass.replace('img-loading', 'img-loaded');
    event.srcElement.className = ImgClass;
  }

  formatMoney(number, decPlaces = 0, decSep = '.', thouSep = ',') {
    const sign = number < 0 ? '-' : '';
    // tslint:disable-next-line: radix
    const i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    const j = i.length > 3 ? i.length % 3 : 0;

    return sign +
      (j ? i.substr(0, j) + thouSep : '') +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSep) +
      (decPlaces ? decSep + Math.abs(number - +i).toFixed(decPlaces).slice(2) : '');
  }

  formatDecimal(value) {
    let newVal = this.formatNumber(value);
    newVal = this.numberWithCommas(newVal);
    if (newVal) {
      return newVal;
    }
    return '';
  }

  formatNumber(value) {
    let newVal = value.toString().replace(/\D/g, '');
    if (newVal !== '') {
      newVal = Number(newVal);
    }
    if (newVal) {
      return newVal;
    }
    return '';
  }

  numberWithCommas(x) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  toSeoUrl(url) {
    return url.toString()             // Convert to string
      .normalize('NFD')               // Change diacritics
      .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
      .replace(/\s+/g,'-')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/&/g,'-and-')          // Replace ampersand
      .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g,'-')             // Remove duplicate dashes
      .replace(/^-*/,'')              // Remove starting dashes
      .replace(/-*$/,'');             // Remove trailing dashes
  }
}