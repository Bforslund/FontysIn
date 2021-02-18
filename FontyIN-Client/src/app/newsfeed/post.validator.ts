import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PostValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string)?.replace(/\s/g, "").length == 0) {
      return { cannotContainSpace: true };
    }

    return null;
  }
}
