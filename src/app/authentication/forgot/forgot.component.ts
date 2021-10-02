import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { ApiService } from '../../shared/service/api/apiservice.service';
declare var $: any;
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  fpass: any;
  model: any = {};

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      // 'background-image': 'url(assets/img/banner.jpg)'
    };
    setTimeout(function () {
      $('.card').removeClass('card-hidden');
    }, 700);
    this.myParams = {
      particles: {
        number: {
          value: 150,
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'star'
          // image: {
          //       src: '../../../assets/img/coin_1.png'
          // }
        },

      }
    };

    setTimeout(function () {
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  OnForgotPassword() {
    if (this.model.username || this.model.email) {
      var obj = {
        userid: this.model.username ? this.model.username : ''
      };
      $('#bodyloader').show();
      this.api.post('/auth/forgotpassword', obj).subscribe(data => {
        $('#bodyloader').hide();
        this.fpass = data;
        if (this.fpass.status === "success") {
          swal({
            title: 'Password Send',
            text: 'Kindly check your registered mail',
            timer: 5000,
            showConfirmButton: false
          }).catch(swal.noop);
        } else {
          swal({
            title: 'Error',
            text: data.data.error_message,
            timer: 3000,
            showConfirmButton: false
          }).catch(swal.noop);
        }
      });
    }
  }
}