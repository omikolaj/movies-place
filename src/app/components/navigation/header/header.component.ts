import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostItDialogService } from '../../post-it-dialog/post-it-dialog.service';

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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public openDialog(): void {         
    this.postItDialogService.openPostItDialog(this.dialog);    
  }
}

