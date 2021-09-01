import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardService } from '../board.service';
import { Board, List } from '../shared/models/schema.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  boards: Board[];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private boardService: BoardService,
    private _dialog: MatDialog
  ) {
    this.boards = this.boardService.getBoards();
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );



}
