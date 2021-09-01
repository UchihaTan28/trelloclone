import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {  Card } from '../shared/models/schema.model';
import { Constants } from '../shared/Constants';

@Component({
  selector: 'app-edit-talk',
  templateUrl: './edit-talk.component.html',
  styleUrls: ['./edit-talk.component.scss']
})
export class EditTalkComponent implements OnInit {

  formGroup: FormGroup;
  issueTypesArrayWithColor = Object.values(Constants.issueTypeListWithColor);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {talk: Card, edit: boolean},
    private dialogRef: MatDialogRef<EditTalkComponent>,
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const talk = this.data && this.data.talk ? this.data.talk : null;
    this.formGroup = this.formBuilder.group({
      title: [talk && talk.title ? talk.title : '', Validators.required],
      desc: [talk && talk.desc ? talk.desc : '', Validators.required],
      colorType: [talk && talk.colorType ? talk.colorType : ''],
      createdAt: [talk && talk.createdAt ? talk.createdAt : new Date()]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
    
  }



}

