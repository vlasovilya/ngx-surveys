import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { NgxFileDropModule } from 'ngx-file-drop';


import { StarRatingComponent } from './components/star-rating/star-rating.component';

import { FormItemDirective } from './form-item/form-item.directive';
import { FormItemComponent } from './form-item/form-item.component';

import { FormItemStringComponent } from './form-item/form-item-string/form-item-string.component';
import { FormItemRatingComponent } from './form-item/form-item-rating/form-item-rating.component';
import { FormItemTextComponent } from './form-item/form-item-text/form-item-text.component';
import { FormItemDateComponent } from './form-item/form-item-date/form-item-date.component';
import { FormItemSegmentsComponent } from './form-item/form-item-segments/form-item-segments.component';
import { FormItemRadioComponent } from './form-item/form-item-radio/form-item-radio.component';
import { FormItemNumericRatingComponent } from './form-item/form-item-numeric-rating/form-item-numeric-rating.component';
import { FormItemSelectComponent } from './form-item/form-item-select/form-item-select.component';
import { FormItemOptionsEditorComponent } from './form-item/form-item-options-editor/form-item-options-editor.component';
import { FormItemCheckboxComponent } from './form-item/form-item-checkbox/form-item-checkbox.component';

import { FormBuilderComponent } from './form-builder/form-builder.component';
import { DialogSectionEdit } from './dialogs/dialog-section-edit/dialog-section-edit';
import { DialogItemEdit } from './dialogs/dialog-item-edit/dialog-item-edit';
import { DialogItemVisibility } from './dialogs/dialog-item-visibility/dialog-item-visibility';
import { NgxSurveyComponent } from './ngx-survey.component';
import { NgxSurveyService } from './ngx-survey.service';
import { NgxMaskModule } from 'ngx-mask';
import { AngularResizeEventModule } from 'angular-resize-event';
import { RadioGroupComponent } from './form-item/form-item-radio/radio-group/radio-group.component';
import { SelectionListComponent } from './form-item/form-item-radio/selection-list/selection-list.component';
import { SelectComponent } from './form-item/form-item-radio/select/select.component';
import { FormItemFileComponent } from './form-item/form-item-file/form-item-file.component';
import { FileListItemFileComponent } from './form-item/form-item-file/file-list-item-file/file-list-item-file.component';
import { FileListItemImageComponent } from './form-item/form-item-file/file-list-item-image/file-list-item-image.component';
import { FileListItemVideoComponent } from './form-item/form-item-file/file-list-item-video/file-list-item-video.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { FormItemVoiceComponent } from './form-item/form-item-voice/form-item-voice.component';
import { TruncatePipe } from './pipes/truncate.pipe';

const formItemComponents=[
    FormItemStringComponent,
    FormItemRatingComponent,
    FormItemTextComponent,
    FormItemDateComponent,
    FormItemSegmentsComponent,
    FormItemRadioComponent,
    FormItemNumericRatingComponent,
    FormItemSelectComponent,
    FormItemOptionsEditorComponent,
    FormItemCheckboxComponent,

    DialogSectionEdit,
    DialogItemEdit,
    DialogItemVisibility
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatMomentDateModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        DragDropModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatStepperModule,
        NgxMaskModule.forRoot(),
        AngularResizeEventModule,
        NgxFileDropModule,
        MatProgressBarModule
    ],
    declarations: [
        FormItemDirective,
        FormItemComponent,
        ...formItemComponents,
        FormBuilderComponent,
        StarRatingComponent,
        NgxSurveyComponent,
        RadioGroupComponent,
        SelectionListComponent,
        SelectComponent,
        FormItemFileComponent,
        FileListItemFileComponent,
        FileListItemImageComponent,
        FileListItemVideoComponent,
        FileSizePipe,
        DurationPipe,
        TruncatePipe,
        FormItemVoiceComponent
    ],
    exports: [
        FormBuilderComponent,
        NgxSurveyComponent
    ],
    providers: [
        NgxSurveyService,
        {
            provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
        }
    ]
})
export class NgxSurveyModule { }
