import { Component, OnInit, Input } from '@angular/core';
import { RequestError } from 'src/app/models/requesterror.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() error$: Observable<RequestError>;
  constructor() { }

  ngOnInit() {
  }

}
