import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-github-button',
  templateUrl: './github-button.component.html',
  styleUrls: ['./github-button.component.css']
})
export class GithubButtonComponent implements OnInit {
  @Input() public gitHubLogo: string;
  
  constructor() { }

  ngOnInit() {
    
  }
}
