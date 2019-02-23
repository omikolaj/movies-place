import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { PostItDialog } from '../../components/post-it-dialog/post-it-dialog.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  name:string;
  constructor(private http: HttpClient,
    private location: Location,
    private router: Router
    ) { }

  public openPostItDialog(dialog: MatDialog): void {
    const dialogRef = dialog.open(PostItDialog, {
      width: '250px',
      data: { name: this.name }
    });
    const url = this.router.createUrlTree(['post']).toString();
    this.location.go(url);
    console.log("Dialog was open");

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.name = result;
      this.location.go("");
    })
  }

  // Async Calls
  public fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('api/v1/posts');
  }

  public createNewPost(form: FormGroup){
    console.log(form);
  }
}
