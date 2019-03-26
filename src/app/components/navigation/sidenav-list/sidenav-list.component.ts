import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostItDialogService } from '../../post-it-dialog/post-it-dialog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthFacadeService } from 'src/app/facades/auth-facade/auth-facade.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Input() githubButtons: TemplateRef<any>;
  unauthorizedSubscription: any;
 
  constructor(
    private postItDialogService: PostItDialogService,
    public dialog: MatDialog,
    private authService: AuthService,
    private authFacadeService: AuthFacadeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
 
  ngOnInit() {
  }
 
  public onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  public openDialog(): void {
    this.onSidenavClose();
    this.router.navigateByUrl('posts/(modal:new)');  
  }

  public logout(): void {
    this.onSidenavClose();
    this.authFacadeService.logout();
  }



}
