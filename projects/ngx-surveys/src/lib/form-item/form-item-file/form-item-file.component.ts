
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

export class FormItemFile extends FormItem {
    type: string;
    multiple: boolean;
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

    public files: any[];

    public fileIsOver: boolean;
    public isFilesUploading: boolean;
    public uploadedFilesNumber: number=0;
    public uploadFilesNumber: number=0;



    public uploaderFieldParams:any={
        name:'screenshots',
        uploaderType: "multiple",
        workflow: "media",
        allowedTypes: "image/jpeg,image/png,image/svg",
    }

    constructor() { }


    ngOnInit() {
        this.matcher.item=this.item;
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
        //console.log(this.fileObjects, this.files);
        this.files=_.without(this.files, file);
        this.fileObjects=_.without(this.fileObjects, this.fileObjects.find(f=>f.id===file.id));
        //console.log(this.fileObjects, this.files);
      }

      public fileOver(fileIsOver: boolean): void {
          //console.log('fileIsOver', fileIsOver);
          this.fileIsOver = fileIsOver;
      }

      public onFileDrop(event): void {
          //console.log('onFileDrop', event, this.files);

          const dataTransfer = event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
          this.files = _.union(this.files, dataTransfer.files);
          this.uploadFiles(dataTransfer.files);
      }

      public onFileSelect(event): void {
        //console.log(event);
        let files=(event.srcElement || event.target).files;
        //console.log(files, this.files, _.union(this.files, files));
        console.log(files);
        this.files = _.union(this.files, files);
        this.uploadFiles(files);
      }

      processFileObject(file, fileResult){
        //console.log(file, fileResult);
        if (FileReader && fileResult.fileSourse) {
            var fr = new FileReader();
            fr.onload = function () {
                fileResult.fileSourse.src=fr.result;
            }
            fr.readAsDataURL(fileResult.fileSourse);
        }
        return file;
    }

      uploadFiles(files) {
        //console.log(files);
        if(!files.length){
            return;
        }
        this.isFilesUploading = true;

        this.uploadFilesNumber=files.length;
        this.uploadedFilesNumber=1;

        const streams=[...files].map(file=>this.uploadFile(file).pipe(map(res=>{
          //console.log(res);
          const fileObj=res['file'];
          if (fileObj){
            file.url=fileObj.get('url');
          }
          file.id=fileObj.id;
          if (this.files.indexOf(file)<0){
            return null;
          }
          return res;
        })));

        /* ono
        this.parse.eachLimit(streams, 10).subscribe(res=>{

          this.fileObjects=_.union(this.fileObjects || [], res.filter(item=>item).map(item=>this.processFileObject(item.file, item)));
          this.isFilesUploading=false;

        });
        */
        //console.log(this.fileObjects);
      }

      uploadFile(file): Observable<any> {
        //console.log(file);

        this.isFilesUploading=true;
        file.uploading=true;
        let data={file};
        data['progress'] = new Observable(observer => {
            data['progressObserver'] = observer
        });
        //data['workflow'] = this.field.workflow;
        data['progress'].subscribe(
          data => {
            file.progress=data;
            //console.log('progress = '+data);
            //this.cd.detectChanges();
          });
        return of({});
        /* //ono
        return this.parse.uploadFileWithProgress(data).pipe(map(res=>{
            //console.log(res);

            //this.cd.detectChanges();

            if (res['streamId']){
                file.workflowStreamId=res['streamId'];
            }
            this.uploadedFilesNumber++;
            file.uploading=false;
            res['fileSourse']=file;
            if (!file.deleted){
                return res;
            }
        }));
        */

      }
}
