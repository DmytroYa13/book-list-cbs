import { FormControl } from '@angular/forms';


export class CustomValidators {

    static noSpaces(control: FormControl): { [key: string]: boolean } {
   
        if(!control.value.trim()) {
            return {noSpace: true}
        }
        return null
    }
}