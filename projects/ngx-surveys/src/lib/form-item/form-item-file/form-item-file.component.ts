
import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';
import * as _ from 'lodash';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSurveyService } from '../../ngx-survey.service';
//import { map } from 'rxjs/operators';

export class FormItemFile extends FormItem {
    fileType: string;
    multiple: boolean;
    value: SurveyFile[];
    areaLabel: string;
    buttonLabel: string;
}

export class SurveyFile {
    progressSubject: Observable<number>;
    progressObserver: Observer<number>;
    progressValue: number;
    uploading: boolean;
    name: string;
    size: number;
    mime: string;
    src: string | ArrayBuffer | null;
    url: string;
    file: File;
}

@Component({
  selector: 'ammo-form-item-file',
  templateUrl: './form-item-file.component.html',
  styleUrls: ['./form-item-file.component.scss']
})
export class FormItemFileComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemFile;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemFile>();
    matcher = new SurveyErrorStateMatcher();

    public fileObjects: any[]=[];

    public files: SurveyFile[];

    public fileIsOver: boolean;
    public isFilesUploading: boolean;
    public allowDelete: boolean=true;
    public uploadedFilesNumber: number=0;
    public uploadFilesNumber: number=0;
    public accept:string;
    private acceptTypes: any={
        image: '.png, .jpg, .jpeg',
        video: '.mp4, .mov',
        file: '*'
    }

    public uploaderFieldParams:any={
        name:'screenshots',
        uploaderType: "multiple",
        workflow: "media",
        allowedTypes: "image/jpeg,image/png,image/svg",
    }

    constructor(
        private service: NgxSurveyService,
        private zone: NgZone,
    ) { }


    ngOnInit() {
        if (this.item.value){
            this.files=this.item.value.map(f=>{
                const obj=_.extend(new SurveyFile(), f);
                return obj;
            });
        }
        this.matcher.item=this.item;
        this.accept=this.acceptTypes[this.item.fileType];
    }

    ngOnChanges() {
        this.matcher.item=this.item;
    }

    checkRequired(placeholder) {
        if (placeholder === 'Required') {
            return true;
        }
    }

    onValueChanges(item) {
        this.changes.emit(item);
    }

    removeFile(file){
        this.files=_.without(this.files, file);
        this.fileObjects=_.without(this.fileObjects, this.fileObjects.find(f=>f.id===file.id));
    }

    public fileOver(fileIsOver: boolean): void {
        console.log('fileIsOver', fileIsOver);
        this.fileIsOver = fileIsOver;
    }

    public onFileDrop(files: NgxFileDropEntry[]): void {
        console.log('onFileDrop', files, this.files);
        const surveyFiles:SurveyFile[]=[];

        let droppedFiles=files.filter(f=>f.fileEntry.isFile && this.accept.split(',').find(ext=>f.fileEntry.name.indexOf(ext.trim())>0));
        if (!this.item.multiple && droppedFiles.length>1){
            droppedFiles=[droppedFiles[0]];
        }
        droppedFiles.forEach(droppedFile=>{
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                const surveyFile=new SurveyFile();
                surveyFile.size=file.size;
                surveyFile.name=file.name;
                surveyFile.mime=file.type;
                surveyFile.file=file;
                if (file.type.indexOf('image/')===0){
                    if (FileReader) {
                        var fr = new FileReader();
                        fr.onload = function () {
                            surveyFile.src=fr.result;
                        }
                        fr.readAsDataURL(file);
                    }
                }
                surveyFiles.push(surveyFile);
                if (surveyFiles.length===droppedFiles.length){
                    this.uploadFiles(surveyFiles);
                }
                // Here you can access the real file
                console.log(droppedFile.relativePath, file);
            });
        })


    }

    uploadFiles(files: SurveyFile[]) {
        console.log(files);
        if(!files.length){
            return;
        }
        files.forEach(file=>{
            file.uploading=true;
            file.progressSubject = new Observable(observer => {
                file.progressObserver = observer
            });
            file.progressSubject.subscribe(
              data => {
                this.zone.run(()=>{
                    file.progressValue=data;
                    //console.log(file);
                    if (file.url){
                        this.item.value=this.files.filter(f=>f.url).map(f=>{
                            const obj=new SurveyFile;
                            obj.url=f.url;
                            obj.name=f.name;
                            obj.mime=f.mime;
                            return obj;
                        });
                        console.log(this.item);
                        this.changes.emit(this.item);
                    }
                })
              }
            );
        })
        this.service.onFilesSelected.next(files);
        this.files=_.union(this.files, files);

        this.isFilesUploading = true;

        this.uploadFilesNumber=files.length;
        this.uploadedFilesNumber=1;
    }
}
