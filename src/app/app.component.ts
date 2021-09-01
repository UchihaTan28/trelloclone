import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from './edit-card/edit-talk.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { Board, Card, List } from './shared/models/schema.model';
import { EditTrackComponent } from './edit-list/edit-track.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  boards: Array<Board>=[] ;
  constructor(private _boardService: BoardService, private _dialog: MatDialog) {
    
  }



ngOnInit(): void {
  //console.log(this.getLocalStorageItem('boards'));
  //this.boards = this._boardService.getBoards();
  let storedBoards = this.getLocalStorageItem('boards');
if (storedBoards) {
this.boards = storedBoards;
} else {
this.boards = this._boardService.getBoards();}
}

   setLocalStorageItem(key: string, value: any, expiry: number = null) {
    var item = {
    value: value,
    expiry: expiry
    };
    localStorage.setItem(key, JSON.stringify(item));
    }
    
    getLocalStorageItem(key: string) {
       if (localStorage.getItem(key)) 
       {
         let data:any = JSON.parse(localStorage.getItem(key));
           if (data.expiry && ((new Date().getTime() / 1000) > data.expiry)) 
           {
            this.removeLocalStorageItem(key);
            return null;
           } 
           else return data.value;
        } 
        else return null;
    }
    
    removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
    }

  trackIds(boardIndex): string[] {
    return this.boards[boardIndex].tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<Card[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.filterByDate(event.container.data, -1); 
    this.setLocalStorageItem("boards",this.boards);   
  }


  addEditCard(card: Card, list: List) {
    this._dialog.open(EditTalkComponent, {data: {card}, width: '500px'})
      .afterClosed()
      .subscribe(newCardData => {if( newCardData)  list.talks.unshift(newCardData);
        this.setLocalStorageItem("boards",this.boards);
      });
    
  }
  addEditList(list: List) {
   
    this._dialog.open(EditTrackComponent, {data: {list}, width: '500px'})
      .afterClosed()
      .subscribe(newListData => {
        if(newListData)  this.boards[0].tracks.push(newListData);
        this.setLocalStorageItem("boards",this.boards);
      });
      
  }


  deleteCard(card: Card, list: List) {
    // Opens a dialog panel
    this._dialog.open(DeleteItemComponent, {data: card, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        if (response) {
          list.talks.splice(list.talks.indexOf(card), 1);
        }
      ;this.setLocalStorageItem("boards",this.boards);});
  }
  deleteTrack(list: List) {
    // Opens a dialog panel
    this._dialog.open(DeleteItemComponent, {data: list, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close, then delete the card if required.
        if (response) {
          this.boards[0].tracks.splice(this.boards[0].tracks.indexOf(list), 1);
        }
      ;this.setLocalStorageItem("boards",this.boards);});
  }

  filterByDate(cards, asc = 1) {
    cards = [...cards.sort((a: any, b: any) => (asc) * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))];
    
  }
  
}
