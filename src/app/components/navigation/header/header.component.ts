import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostItDialogService } from 'src/app/services/post-it-dialog.service';
import { Location } from '@angular/common';

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
    private postItDialogService: PostItDialogService,
    public dialog: MatDialog,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public openDialog(): void {
    // this.router.navigateByUrl('/post');       
    const url = this.router.createUrlTree(['post']).toString();
    this.location.go(url);
    this.postItDialogService.openPostItDialog(this.dialog);    
  }
}

