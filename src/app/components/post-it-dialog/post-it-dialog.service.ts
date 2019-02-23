import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostItDialogService {
  
  constructor( ) { }

  public createNewPost(form: FormGroup){
    console.log(form);
  }
}
