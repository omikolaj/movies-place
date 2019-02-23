import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  centered: boolean = false;
  disabled: boolean = false;
  unbounded: boolean = false;
  color: string = "#ffffff29";

  constructor(
    private postService: PostService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public openDialog(): void {         
    this.postService.openPostItDialog(this.dialog);    
  }
}

