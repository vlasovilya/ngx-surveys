import { Injectable } from '@angular/core';
import { FormItemError, SurveyFile } from './form-item';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxSurveyService {

    constructor() {

    }

    public onFilesSelected: ReplaySubject<SurveyFile[]> = new ReplaySubject(1);

    public errorMessages: any= {
        require: "Field required",
        minLength: "Must be more than {value} characters",
        maxLength: "Must be less than {value} characters",
        setLength: "{value} Digit Number Required",
        numeric: "The entry can only contain numbers",
        email: "Not valid email"
    };

    public initForm(form, formValues) {
        //console.log(form, formValues);
        form.forEach(section=>{
            if (section.name) {
                const groupedItems = _.groupBy(_.filter(section.items, item=>!item.name), item=>item.type);

                _.each(groupedItems, (items, type)=>{
                    if (type) {
                        section.items[_.indexOf(section.items, _.first(items))] = {
                            type: type,
                            items: items,
                            name: section.name,
                            isSectionValueItem: true,
                        };
                        _.each(items, (item)=>{
                            section.items = _.without(section.items, item);
                        });
                    }
                });
            }
        });


        const visibilityValuesInTableConvert = (item)=>{
            if (item.visibilityValuesInTable) {
                const tableItem = _.first(_.map(form, (section)=>{
                    return _.find(section.items, (item)=>{
                        if (!item.items) {
                            return item.actionUpdatesTableValue;
                        } else {
                            return _.find(item.items, item=>item.actionUpdatesTableValue);
                        }
                    });
                }));
                const newValues = <any[]>[];
                if (tableItem) {
                    _.each(item.visibilityValuesInTable, (val)=>{
                        let valItem = _.find(tableItem.items, item=>item.title===val);
                        newValues.push(valItem && valItem.optionValue ? valItem.optionValue : val);
                    });
                }
                item.visibilityValuesInTable = newValues;
            }
        };

        _.each(form, (section)=>{
            visibilityValuesInTableConvert(section);
            _.each(section.items, (item)=>{
                visibilityValuesInTableConvert(item);
                if (item.type === 'radio' && section.allowsMultipleSelection) {
                    item.multiple = true;
                }
                if (item.multiple && _.isString(item.value)) {
                    if (_.isString(item.value)) {
                        try {
                            item.value = JSON.parse(item.value);
                        }
                        catch (err){
                            console.log(err);
                        }
                    }
                }
                if (formValues[item.name] !== undefined) {
                    item.value = formValues[item.name];
                    if (item.type === 'date' && !_.isString(item.value)) {
                        //item.value = this.getDateStr(formValues[item.name]);
                    }
                    //item.readOnly = item.readOnly || _.contains(this.readOnlyFields, item.name);
                    if (item.multiple && _.isString(item.value)) {
                        item.value = JSON.parse(item.value);
                    }

                    if (item.type === 'numericRating' && _.isString(item.value)) {
                        item.value = parseInt(item.value);
                    }
                }
                if (item.isSectionValueItem && section.sectionValidation && !item.fieldValidation) {
                    item.fieldValidation = section.sectionValidation;
                }
            });
            if (section.subtitle) {
                section.subtitle = section.subtitle.replace(new RegExp('\n', 'g'), '<br />');
            }
        });
        //console.log(form);
        return form;
    }

    public isItemVisible(form, section, item) {
        let res = true;
        if (item.visibilityValuesInSection && item.visibilityValuesInSection.length) {
            let sectionItems = section.items?.filter(item=>item.isSectionValueItem).length ? section.items?.filter(item=>item.isSectionValueItem) : section.items?.filter(item=>item.actionUpdatesSectionValue);

            res = sectionItems.filter((sItem)=>{
                const valArr=_.isArray(sItem.value) ? sItem.value : [sItem.value];
                return valArr.find(val=>
                    item.visibilityValuesInSection.find(arr=>
                        arr.indexOf(val)>=0
                    )
                )
            }
            ).length===item.visibilityValuesInSection.length;
        }
        if (item.visibilityValuesInTable && item.visibilityValuesInTable.length) {
            let tableItem = _.first(_.map(form, (section) => {
                return _.find(section.items, (item) => {
                    if (!item.items) {
                        return item.actionUpdatesTableValue;
                    } else {
                        return _.find(item.items, item=>item.actionUpdatesTableValue);
                    }
                });
            }));
            if (tableItem) {
                res = item.visibilityValuesInTable.indexOf(tableItem.value)>=0;
            }
        }

        if (section.visibilityValuesInTable && section.visibilityValuesInTable.length) {
            let sectionTableItem = _.first(_.map(form, (section) => {
                return _.find(section.items, (item) => {
                    if (!item.items) {
                        return item.actionReloadsTable;
                    } else {
                        return _.find(item.items, item=>item.actionReloadsTable);
                    }
                });
            }));
            if (sectionTableItem) {
                res = section.visibilityValuesInTable.indexOf(sectionTableItem.value)>=0;
            }
        }

        return res;
    };

    public isSectionVisible(form, section) {
        let res = false;
        _.each(section.items, (item)=>{
            if (this.isItemVisible(form, section, item)) {
                res = true;
            }
        });
        return !section.items ? this.isItemVisible(form, section, {}) : res;
    };

    getErrors(item): FormItemError[] {
        if (item.fieldValidations) {
            let errors = <FormItemError []> [];
            _.each(item.fieldValidations.rules, (rule)=>{
                const err =  <FormItemError> this.checkValidationRule(item, rule);
                if (err) {
                    errors.push(err);
                }
            });
            errors = _.flatten(errors);
            if (item.fieldValidations.type === 'OR') {
                return errors.length === item.fieldValidations.rules.length ? [errors[errors.length-1]] : [];
            }
            return errors;
        }
        const err=this.checkValidationRule(item, item.fieldValidation);
        return err ? [err] : [];
    };

    checkValidationRule(item, rule) : FormItemError {
        let res;
        let errorMessages=_.clone(this.errorMessages);
        //console.log(item);
        if (rule && rule.minLength >= 0 && rule.minLength === rule.maxLength) {
            rule.setLength = rule.maxLength;
            delete rule.minLength;
            delete rule.maxLength;
        }
        let validationObj = rule || item.sectionValidation;
        let isNumericError = !/^\d+$/.test(item.value) && validationObj && validationObj.numeric;
        if (!validationObj) {
            //console.log('!validationObj', item);
        }

        _.each(validationObj, (param, name) => {
            if (name === 'minCount') {
                name = 'minLength';
            }
            let message = '';
            let itemValue = '' + item.value;

            switch (name) {
                case "setLength":
                    if (item.value === undefined || (item.value && itemValue.length !== param) || isNumericError) {
                        message = errorMessages[name].replace('{value}', param);
                        if (item.keyboardType && item.keyboardType === 'number-pad') {
                            message = message.replace('characters', 'digits');
                        }
                        res={
                            type: name,
                            message: message
                        };
                    } else if (item.value === null) {
                        //console.log(item);
                        res={
                            type: 'require',
                            message: errorMessages.require
                        };
                    }
                    break;
                case "minLength":
                    if (!_.isObject(item.value) && (item.value === null || item.value === undefined || !item.value || (item.value?.length || 0) < param || isNumericError)) {
                        //console.log(isNumericError, param, item, rule, name);
                        if (param > 1) {
                            message = errorMessages[name].replace('{value}', param);
                            if (item.keyboardType && item.keyboardType === 'number-pad') {
                                message = message.replace('characters', 'digits');
                            }
                            res={
                                type: name,
                                message: message
                            };
                        } else if (!item.value || !item?.value?.length) {
                            //console.log(item);
                            res={
                                type: 'require',
                                message: errorMessages.require
                            };
                        }
                        else if (isNumericError) {
                            res={
                                type: 'numeric',
                                message: errorMessages.numeric
                            };
                        }
                    }
                    if (item.name === 'email' && !res?.length) {
                        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!re.test(item.value)) {
                            res={
                                type: 'email',
                                message: errorMessages.email
                            };
                        }
                    }
                    break;
                case "optionKeyValues":
                    if (!item.value || !item.value.length){
                        res={
                            type: 'require',
                            message: errorMessages.require
                        };
                    }
                    else {
                        if (item.value.find(op=>!op.optionValue || !op.label)){
                            res={
                                type: 'require',
                                message: 'All options should have Value and Labels defined'
                            };
                        }
                    }
                    break;
                default:
                    break;
            }
        });
        return res;
    };

    public getValue(form, validateAll:boolean=false){
        let value = {};
        let valid = true;
        let firstError;
        _.each(_.filter(form, (section)=>this.isSectionVisible(form, section)), (section)=>{
            _.each(_.filter(section.items, (item)=>this.isItemVisible(form, section, item)), (item)=>{
                //value[item.name] = _.isArray(item.value) ? JSON.stringify(item.value) : item.value;

                value[item.name] = item.value;
                if (validateAll){
                    item.errors = this.getErrors(item);
                    if (item.errors && item.errors.length) {
                        if (!firstError) {
                            firstError = item;
                        }
                        valid = false;
                    }
                }
            });
        });
        return {
            valid,
            value,
            firstError
        };
    }
}
