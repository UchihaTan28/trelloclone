import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List,Card } from '../shared/models/schema.model';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {track: List, edit: boolean},
    private dialogRef: MatDialogRef<EditTrackComponent>,
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const track = this.data && this.data.track ? this.data.track : null;
    this.formGroup = this.formBuilder.group({
      title: [track && track.title ? track.title : '', Validators.required],
      talks: [track && track.talks ? track.talks : []],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
    
  }

}
