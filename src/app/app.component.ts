import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  laneN: any = 'lane1';
  baseUrl = environment.baseUrl;
  title = 'stopwatch';
  startTimer : any;
  min: any = '0' + 0;
  sec: any ='0' + 0;
  milisec: any ='0' + 0;
  running: boolean = false;
  splits : any = [];
  splitTime : any;
  deletedTimes : any[] = [];
  deletedTimesLaneN : any = 'deletedTimesLane1';

  constructor(private httClient:HttpClient){}

  start = () => {
    this.running = true;
    this.startTimer = setInterval(() => {
      this.milisec++;
      this.milisec = this.milisec < 10 ? '0' + this.milisec : this.milisec;

      if(this.milisec === 100) {
        this.milisec = '0' + 0;
        this.sec ++;
        this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
      }
      if (this.sec === 10) {
        this.sec = '0' + 0;
        this.min ++;
        this.min = this.min < 10 ? '0' + this.min : this.min;
      }
    }, 10);
  };

  pause = () => {
    this.running = false;
    clearInterval(this.startTimer)
  }

  reset = () => {
    this.running = false;
    this.deletedTimes.push(this.min + ':' + this.sec + '.' + this.milisec)
    this.min = '0' + 0;
    this.sec = '0' + 0;
    this.milisec = '0' + 0;
    this.splits = [];
    console.log(this.deletedTimes)
  }

  split = () => {
  this.splitTime = this.min + ':' + this.sec + '.' + this.milisec;
  this.splits.push(this.splitTime)
  }

  send = () => {
    console.log(this.min + ':' + this.sec + '.' + this.milisec)
    // მთავარი შედეგის გაგზავნა
    this.httClient.post(`${this.baseUrl}/${this.laneN}.json`,
      {result:this.min + ':' + this.sec + '.' + this.milisec}
    ).subscribe(
      response => {
        console.log(console)
      }
    )
  //წაშლილი შედეგების გაგზავნა
    this.httClient.post(`${this.baseUrl}/${this.deletedTimesLaneN}.json`,
      {result:this.deletedTimes}
    ).subscribe(
      response => {
        console.log(console)
      }
    )
  }

}
