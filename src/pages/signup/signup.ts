import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase/app';
import { HomePage } from './../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  signupForm: FormGroup

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider) {
      
      let phoneRegex = /^\(([0-9]{2})\)\ [0-9]{4,5}\-[0-9]{4}$/i;
      let cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/i;
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        telephone:['', Validators.compose([Validators.required, Validators.pattern(phoneRegex)])],
        cpf: ['', Validators.compose([Validators.required, Validators.pattern(cpfRegex)])],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;
    
    this.userProvider.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authProvider.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authUser: firebase.User) => {

            delete formUser.password;
            let uuid: string = authUser.uid;

            this.userProvider.create(formUser, uuid)
              .then(() => {
                console.log('Usuario cadastrado!');
                this.navCtrl.setRoot(HomePage);
                loading.dismiss();
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });

          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });

        } else {

          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();

        }

      })
    
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
