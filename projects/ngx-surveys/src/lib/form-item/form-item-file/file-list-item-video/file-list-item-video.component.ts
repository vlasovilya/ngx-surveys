import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SurveyFile } from '../../form-item';

@Component({
  selector: 'ammo-file-list-item-video',
  templateUrl: './file-list-item-video.component.html',
  styleUrls: ['./file-list-item-video.component.scss']
})
export class FileListItemVideoComponent implements OnInit {

    @Input() file: SurveyFile;
    @Input() allowDelete: boolean;
    @Output() onDelete = new EventEmitter<SurveyFile>();

    constructor() { }

    ngOnInit(): void {
    }
}
