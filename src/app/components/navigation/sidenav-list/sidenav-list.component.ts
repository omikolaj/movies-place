import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { PostItDialogService } from 'src/app/services/post-it-dialog.service';
import { MatDialog } from '@angular/material';

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
