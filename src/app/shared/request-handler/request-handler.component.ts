import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestError } from 'src/app/models/requesterror.model';

@Component({
  selector: 'app-request-handler',
  templateUrl: './request-handler.component.html',
  styleUrls: ['./request-handler.component.css']
})
export class RequestHandlerComponent implements OnInit {
  @Input() loading$: Observable<boolean>;
  @Input() responseError$: Observable<RequestError>;
  constructor() { }

  ngOnInit() {
  }

}
