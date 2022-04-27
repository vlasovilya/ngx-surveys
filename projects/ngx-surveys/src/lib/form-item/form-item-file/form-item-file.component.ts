
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { FormItem, SurveyErrorStateMatcher, FormItemWidget } from '../index';
import * as _ from 'lodash';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSurveyService } from '../../ngx-survey.service';
//import { map } from 'rxjs/operators';

export class FormItemFile extends FormItem {
    type: string;
    multiple: boolean;
}

export class SurveyFile extends NgxFileDropEntry {
    progressSubject: Observable<number>;
    progressObserver: Observer<number>;
    progressValue: number;
    uploading: boolean;
    name: string;
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

    constructor(
        private service: NgxSurveyService,
    ) { }


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

      public onFileDrop(files: NgxFileDropEntry[]): void {
            console.log('onFileDrop', files, this.files);
            this.files = files;
            for (const droppedFile of files) {
                // Is it a file?
                if (droppedFile.fileEntry.isFile) {
                    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    /**
                     // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)

                    // Headers
                    const headers = new HttpHeaders({
                        'security-token': 'mytoken'
                    })

                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                        // Sanitized logo returned from backend
                    })
                    **/

                    });
                } else {
                    // It was a directory (empty directories are added, otherwise only files)
                    const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                    console.log(droppedFile.relativePath, fileEntry);
                }
            }
            this.uploadFiles(this.files);
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

      uploadFiles(files: SurveyFile[]) {
        //console.log(files);
        if(!files.length){
            return;
        }
        files.forEach(file=>{
            file.uploading=true;
            file.name=file.relativePath;
            file.progressSubject = new Observable(observer => {
                file.progressObserver = observer
            });
            file.progressSubject.subscribe(
              data => {
                file.progressValue=data;
                //console.log(file);
              }
            );
        })
        this.service.onFilesSelected.next(files);
        this.files=_.union(this.files, files);

        this.isFilesUploading = true;

        this.uploadFilesNumber=files.length;
        this.uploadedFilesNumber=1;
/* ono
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
