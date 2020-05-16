import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  electricalDevices = [
    {
      'name': 'Light 1',
      'value': 'light1',
      'on': true,
      'power': 50
    },
    {
      'name': 'Light 2',
      'value': 'light2',
      'on': false,
      'power': 30
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
