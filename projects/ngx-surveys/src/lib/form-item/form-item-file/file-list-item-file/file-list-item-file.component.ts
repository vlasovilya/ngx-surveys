import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SurveyFile } from '../../form-item';

@Component({
  selector: 'ammo-file-list-item-file',
  templateUrl: './file-list-item-file.component.html',
  styleUrls: ['./file-list-item-file.component.scss']
})
export class FileListItemFileComponent implements OnInit {

    @Input() file: SurveyFile;
    @Input() allowDelete: boolean;
    @Output() onDelete = new EventEmitter<SurveyFile>();

    constructor() { }

    ngOnInit(): void {
    }

}
