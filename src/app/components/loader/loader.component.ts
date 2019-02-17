import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestError } from 'src/app/models/requesterror.model';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {  
  constructor() { }

  ngOnInit() {
  }

}
