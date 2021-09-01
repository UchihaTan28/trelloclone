import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../shared/Constants';
import { ColorType } from '../shared/models/schema.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  issueTypesWithColor = Constants.issueTypeListWithColor;
  issueTypes = Object.values(ColorType);
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() title: string;
  @Input() desc: string;
  @Input() createdAt: Date;
  @Input() colorType?: string;
  
  constructor() { }

  ngOnInit() {
  }

}
