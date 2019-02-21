import { Component, OnInit, Input } from '@angular/core';
import { RequestError } from 'src/app/models/requesterror.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {  
  @Input() error: RequestError;
  constructor() { }

  ngOnInit() {
  }

}
