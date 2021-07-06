import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


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
import { AngularResizedEventModule } from 'angular-resize-event';
import { RadioGroupComponent } from './form-item/form-item-radio/radio-group/radio-group.component';
import { SelectionListComponent } from './form-item/form-item-radio/selection-list/selection-list.component';
import { SelectComponent } from './form-item/form-item-radio/select/select.component';

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
        AngularResizedEventModule,
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
        SelectComponent
    ],
    entryComponents: [
        ...formItemComponents
    ],
    exports: [
        FormBuilderComponent,
        NgxSurveyComponent
    ],
    providers: [
        NgxSurveyService,
        {
            provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
        }
    ],
})
export class NgxSurveyModule { }
