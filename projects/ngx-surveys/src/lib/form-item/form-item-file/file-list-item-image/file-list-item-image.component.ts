import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SurveyFile } from '../form-item-file.component';

@Component({
  selector: 'ammo-file-list-item-image',
  templateUrl: './file-list-item-image.component.html',
  styleUrls: ['./file-list-item-image.component.scss']
})
export class FileListItemImageComponent implements OnInit {

    @Input() file: SurveyFile;
    @Input() allowDelete: boolean;
    @Output() onDelete = new EventEmitter<SurveyFile>();

    constructor() { }

    ngOnInit(): void {
    }

}
