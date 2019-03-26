import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostItDialogService } from '../../post-it-dialog/post-it-dialog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthFacadeService } from 'src/app/facades/auth-facade/auth-facade.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private authService: AuthService,
    private authServiceFacade: AuthFacadeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public openDialog(): void {
    console.log("Inside of openDialog for new post");         
    this.router.navigateByUrl('posts/(modal:new)');    
  }
}

