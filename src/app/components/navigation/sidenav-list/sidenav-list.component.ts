import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostItDialogService } from '../../post-it-dialog/post-it-dialog.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Input() githubButtons: TemplateRef<any>;
 
  constructor(
    private postItDialogService: PostItDialogService,
    public dialog: MatDialog 
  ) { }
 
  ngOnInit() {
  }
 
  public onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  public openDialog(): void {
    this.onSidenavClose();
    this.postItDialogService.openPostItDialog(this.dialog);    
  }



}
