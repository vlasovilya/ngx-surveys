import { EventEmitter } from '@angular/core';

export interface FormItemError {
    type?: string;
    message?: string;
}

export interface FormItemValidationRules {
    minLength?: number;
    optionKeyValues?: boolean;
}

export interface FormItemValidation {
    rules: FormItemValidationRules[];
}

export class FormItem {
    type: string;
    name: string;
    label: string;
    style: string;
    value: string | number | string[] | boolean | FormItemOptionItem[];
    errors: FormItemError[];
    fieldValidations: FormItemValidation;
    fieldValidation: FormItemValidationRules;
    hasOptions: boolean;
    justAdded:  boolean;
    required:  boolean;
    readOnly:  boolean;
    actionUpdatesTableValue: boolean;
    actionUpdatesSectionValue: boolean;
    visibilityValuesInTable: string[];
    visibilityValuesInSection: string[];
    items?: FormItemOptionItem[];
    segments?: FormItemOptionItem[];
}

export interface FormItemOptionItem {
    optionValue: string;
    label: string;
}


export interface FormItemWidget {
    item: FormItem;
    editable: boolean;
    changes: EventEmitter<FormItem>;
}

export interface FormSection {
    name?: string;
    title?: string;
    subtitle?: string;
    sectionStyle?: string;
    items?: FormItem[];
}