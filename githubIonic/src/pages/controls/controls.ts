import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EurecaClient } from '../../providers/eureca';
/*
  Generated class for the Controls page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-controls',
  templateUrl: 'controls.html'
})
export class ControlsPage {

  constructor(public navCtrl: NavController, public eureca: EurecaClient) {}
  ionViewDidLoad() {
    console.log('Hello ControlsPage Page');
  }
  rgb = {r: 50, g: 50, b: 50};

  MoveUpMouseDown() {
  	this.eureca.MoveUpMouseDown();
  	console.log("MUC");
  }
  MoveUpMouseUp() {
  	this.eureca.MoveUpMouseUp();
  	console.log("MUK");
  }
  MoveDownMouseDown() {
  	this.eureca.MoveDownMouseDown();
  	console.log("MDC");
  }
  MoveDownMouseUp() {
  	this.eureca.MoveDownMouseUp();
  	console.log("MDK");
  }
  SetSliderBrightness(event) {
  	this.eureca.SetSliderBrightness(1, event.currentTarget.value);
  	console.log("Slider B", event);
  }
  SetLEDR(event) {
  	this.rgb.r = event.currentTarget.value;
  	this.eureca.SetLED(this.rgb);
  	console.log("LEDR", event);
  }
  SetLEDG(event) {
  	this.rgb.g = event.currentTarget.value;
  	this.eureca.SetLED(this.rgb);
  	console.log("LEDG", event);
  }
  SetLEDB(event) {
  	this.rgb.b = event.currentTarget.value;
  	this.eureca.SetLED(this.rgb);
  	console.log("LEDB", event);
  }
  ServerStatus() {
  	this.eureca.ServerStatus();
  	console.log("ServerStatus", event);
  }
}
