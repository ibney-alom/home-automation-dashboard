import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() device:any;
  totalPower:number;
  constructor() { }

  ngOnInit() {
    this.totalPowerCon();
  }

  totalPowerCon(){
    this.totalPower = 0;
    for(let index in this.device){
      if(this.device[index].on){
        this.totalPower += this.device[index]['power'];
      }
    }
  }
  i = 0
  ngDoCheck(){
    this.totalPowerCon();
  }

}
