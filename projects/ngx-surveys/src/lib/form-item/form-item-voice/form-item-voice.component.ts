import { Component, OnInit, Input, Output, EventEmitter, NgZone, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyErrorStateMatcher } from '../index';
import { FormItem, FormItemWidget, SurveyFile } from '../form-item';
import * as _ from 'lodash';
import { NgxSurveyService } from '../../ngx-survey.service';
//import { map } from 'rxjs/operators';
import * as WaveSurfer from 'wavesurfer.js';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

export class FormItemVoice extends FormItem {
    value?: SurveyFile;
    areaLabel: string;
    buttonLabel: string;
}

@Component({
    selector: 'app-form-item-voice',
    templateUrl: './form-item-voice.component.html',
    styleUrls: ['./form-item-voice.component.scss']
  })
export class FormItemVoiceComponent implements FormItemWidget, OnInit, AfterViewInit {

    @ViewChild('audio', { static: true }) audio: any;
    @ViewChild('waveform', { static: true }) waveformElement: any;

    @Input() item: FormItemVoice;
    @Input() editable: boolean=true;
    @Output() changes = new EventEmitter<FormItemVoice>();
    matcher = new SurveyErrorStateMatcher();

    public fileObject: any;

    public file: undefined | SurveyFile;

    public isFilesUploading: boolean;
    public allowDelete: boolean=true;
    public uploadedFilesNumber: number=0;
    public uploadFilesNumber: number=0;

    public stream:any;
    public recordRTC:any;
    public recordedBlob: any;
    public recordingInprogress: boolean;
    public blobSize:number;
    public hasRecord:boolean;
    public duration:number;
    public timeLimit:number=120;
    public wavesurfer:any;
    public wavesurferPlay:boolean;
    public isEdge: boolean = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator['msSaveOrOpenBlob'] || !!navigator['msSaveBlob']);
    public isSafari: boolean = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    public durationInterval;
    public controlIcon:string = 'record-circle';


    constructor(
        private service: NgxSurveyService,
        private zone: NgZone,
    ) { }


    ngOnInit() {
        if (this.item.value){
            this.file=_.extend(new SurveyFile(), this.item.value);
            if (this.file?.url){
                this.hasRecord=true;
            }
        }
        this.matcher.item=this.item;
        this.service;
        this.zone;
        Observable;
    }

    ngAfterViewInit() {
        // set the initial state of the video
        let audio:HTMLAudioElement = this.audio.nativeElement;
        audio.muted = false;
        audio.controls = true;
        audio.autoplay = false;

        if (this.file?.url){
            this.hasRecord=true;
            this.wavesurfer = WaveSurfer.create({
                container: this.waveformElement.nativeElement,
                height: 190,
                waveColor: '#d4d9dd',
                progressColor: '#555',
                normalize: true,
                barHeight: 8,
                cursorWidth: 1,
                cursorColor: '#d9d9d9'
            });
            this.wavesurfer.load(this.file.url);

            this.wavesurfer.on('ready', ()=>{
            console.log(this.wavesurfer);
                this.zone.run(()=>{
                    if (this.file){
                        this.file.duration=this.wavesurfer.getDuration();
                        this.duration=this.file.duration*1000;
                        this.wavesurferPlay=false;
                    }
                })

            });
            this.wavesurfer.on('play', ()=>{
                this.zone.run(()=>{
                    this.wavesurferPlay=true;
                })
            });
            this.wavesurfer.on('pause', ()=>{
                this.zone.run(()=>{
                    this.wavesurferPlay=false;
                })

            });
        }
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

    clear(){
        this.file=undefined;
        this.fileObject=undefined;
    }
/*
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
    */

    onCloseClick(): void {
        //this.dialogRef.close();
    }

    startRecording() {
        let mediaConstraints = {
            audio: this.isEdge ? true : {
                echoCancellation: false
            }
        };
        this.blobSize=0;
        //window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext'];
        navigator.mediaDevices
          .getUserMedia(mediaConstraints)
          .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    errorCallback(stream: MediaStream) {
        //console.log(stream);
    }

    successCallback(stream: MediaStream) {
        const microphone=stream;

        if(this.isSafari) {
            this.audio.muted = true;
            this.audio.srcObject = microphone;
        }

        //console.log(stream);
        //let audio: HTMLAudioElement = this.audio.nativeElement;
        let options = {
            mimeType: 'audio/webm',
            numberOfAudioChannels: this.isEdge ? 1 : 2,
            checkForInactiveTracks: true,
            bufferSize: 16384,
            elementClass: 'multi-streams-mixer'
        };
        this.stream = stream;

        if(this.isSafari || this.isEdge) {
            options['recorderType'] = StereoAudioRecorder;
        }

        if(navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
            options['sampleRate'] = 48000; // or 44100 or remove this line for default
        }
        if(this.isSafari) {
            options['sampleRate'] = 44100;
            options['bufferSize'] = 4096;
            options['numberOfAudioChannels'] = 2;
            options['mimeType']='audio/wav';
        }
        if(this.recordRTC) {
            this.recordRTC.destroy();
            this.recordRTC = null;
        }

        this.recordRTC = new RecordRTC(stream, options);
        this.recordRTC.startRecording();
        this.audio.srcObject = stream;
        //audio.src = this.recordRTC.toURL();
        this.duration=0;
        this.durationInterval=setInterval(()=>{
            //console.log(this.recordRTC.getState(), this.recordRTC);
            if (this.recordRTC && this.recordRTC.getState()==='recording'){
                this.duration++;
                //this.cd.detectChanges();
            }
            else {
                //clearInterval(durationInterval);
            }
        }, 1000);
        //console.log(this.recordRTC);

        this.toggleControls();
        this.recordingInprogress=true;
    }

    toggleControls() {
        let audio: HTMLAudioElement = this.audio.nativeElement;
        audio.muted = !audio.muted;
        audio.controls = !audio.controls;
        audio.autoplay = !audio.autoplay;
    }

    stopRecording() {
        let recordRTC = this.recordRTC;
        recordRTC.stopRecording(this.processAudio.bind(this));
        let stream = this.stream;
        stream.getTracks().forEach(track => track.stop());
        this.recordingInprogress=false;
        if (this.durationInterval){
            clearInterval(this.durationInterval);
        }
    }

    processAudio(audioVideoWebMURL) {
        let audio: HTMLAudioElement = this.audio.nativeElement;
        let recordRTC = this.recordRTC;
        let fileReader = new FileReader();
        fileReader;

        audio.src = audioVideoWebMURL;
        this.toggleControls();
        this.recordedBlob = recordRTC.getBlob();
        if (!this.recordedBlob){
            this.hasRecord=false;
            return;
        }
        let ext='mp3';
        if (this.recordedBlob.type){
            ext=this.recordedBlob.type.split('/')[1];
            ext=ext.split(';')[0];
        }
        this.recordedBlob.name='audio.'+ext;

        if (!this.file){
            this.file=new SurveyFile();
            this.file.name='audio.'+ext;
        }
        //this.file.workflow='audio';
        this.file.mime=this.recordedBlob.type;
        fileReader.onload = (event) => {
            if (this.file && event?.target){
                this.file.src=event.target['result'];
                this.uploadFile(this.file);
            }
        };
        fileReader.readAsArrayBuffer(this.recordedBlob);
        this.file.size=this.recordedBlob.size;
        this.zone.run(()=>{
            this.hasRecord=true;
        })
        //console.log(this.recordedBlob);
        recordRTC.getDataURL(dataURL=>{
            //console.log(audioVideoWebMURL, dataURL, audio.src);
            this.wavesurfer = WaveSurfer.create({
                  container: this.waveformElement.nativeElement,
                  height: 190,
                  waveColor: '#d4d9dd',
                  progressColor: '#555',
                  normalize: true,
                  barHeight: 8,
                  cursorWidth: 1,
                  cursorColor: '#d9d9d9'
            });
            this.wavesurfer.loadBlob(this.recordedBlob);

            this.wavesurfer.on('ready', ()=>{
                //console.log(this.wavesurfer.getDuration());
                if (this.file){
                    this.file.duration=this.wavesurfer.getDuration();
                    this.duration=this.file.duration*1000;
                    this.wavesurferPlay=false;
                }
            });
            this.wavesurfer.on('play', ()=>{
                this.zone.run(()=>{
                    this.wavesurferPlay=true;
                })
            });
            this.wavesurfer.on('pause', ()=>{
                this.zone.run(()=>{
                    this.wavesurferPlay=false;
                })

            });
        });

        return this.file;
    }

    uploadFile(file:SurveyFile){
        file.uploading=true;
        file.progressSubject = new Observable(observer => {
            file.progressObserver = observer
        });
        this.item.busy=true;
        file.progressSubject.subscribe(
            data => {
                this.zone.run(()=>{
                    file.progressValue=data;
                    //console.log(file);
                    if (file.url){
                        const obj=new SurveyFile;
                        obj.url=file.url;
                        obj.name=file.name;
                        obj.mime=file.mime;
                        this.item.value=obj;
                        console.log(this.item);
                        this.item.busy=false;
                        this.changes.emit(this.item);
                    }
                })
            },
            err=>{
                this.item.busy=false;
            }
        );
        this.service.onFilesSelected.next([file]);
        this.file=file;
    }

    play(){
        if (this.wavesurfer){
            this.wavesurfer.play();
        }
    }
    pause(){
        if (this.wavesurfer){
            this.wavesurfer.pause();
        }
    }

    togglePlay(){
        if (this.wavesurfer){
            if (this.wavesurferPlay) {
                this.pause();
                this.controlIcon = 'play-circle-thin';
            } else {
                this.play();
                this.controlIcon = 'pause-circle-thin';
            }
        }
    }

    toggleRecording(){
        //console.log('CLICKED');
        if (this.recordingInprogress){
            this.stopRecording();
            this.controlIcon = 'play-circle-thin';
        } else {
            this.startRecording();
            this.controlIcon = 'record-round';
        }
    }

    clearBlob(){
        this.file=undefined;
        this.recordedBlob=null;
        this.hasRecord=false;
        if (this.wavesurfer){
            this.wavesurfer.destroy()
        }
        if (this.recordRTC){
            //this.recordRTC.destroy()
        }
        this.controlIcon = 'record-circle';
        this.item.value=undefined;
        this.changes.emit(this.item);
    }

    download() {
        this.recordRTC.save('audio.webm');
    }

    onSave(){
        //this.stopRecording();
    }

    ngOnDestroy() {
        if (this.wavesurfer){
            this.wavesurfer.destroy()
        }
        if (this.recordRTC && this.recordRTC.state==='recording'){
            this.recordRTC.stopRecording();
            this.recordRTC.clearRecordedData();
            //this.stopRecording();
        }
        if (this.recordRTC){
            this.recordRTC.destroy()
        }
        if (this.stream){
            this.stream.getTracks().forEach(track => track.stop());
        }
        if (this.durationInterval){
            this.duration=0;
            clearInterval(this.durationInterval);
        }
    }
}
