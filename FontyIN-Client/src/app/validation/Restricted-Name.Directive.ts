import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';


@Directive({
    selector: '[appNameNotAllowed]',
    providers:[{provide:NG_VALIDATORS, useExisting: NameValidator, multi:true}]
})

export class NameValidator implements Validator{
    @Input('appNameNotAllowed') nameNotAllowed:string;

    validate(control: AbstractControl) :{[key:string]: any} | null
    {
        const notAllowed = new RegExp(this.nameNotAllowed).test(control.value);

        return notAllowed ? {'NameNotAllowed':true} : null;
    }

}