import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-picker',
  templateUrl: './repo-picker.component.html',
  styleUrls: ['./repo-picker.component.css']
})
export class RepoPickerComponent implements OnInit {
  centered: boolean = false;
  disabled: boolean = false;
  unbounded: boolean = false; 
  color: string = "#ffffff29";
  constructor() { }

  ngOnInit() {
  }

}
