import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[form-item-host]',
})
export class FormItemDirective {
    constructor(
        public viewContainerRef: ViewContainerRef
    ) { }
}
