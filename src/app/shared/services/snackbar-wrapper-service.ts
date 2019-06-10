import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarWrapperService {
    private snackBarDuration = 3000;
    constructor(public snackBar: MatSnackBar) { }

    openFromComponent<T, K>(component: ComponentType<T>, data: K, duration: number = this.snackBarDuration) {
        this.snackBar.openFromComponent(component, {
            duration,
            data
        });
    }

    openTemplate<T, K>(template: TemplateRef<T>, data: K, duration: number = this.snackBarDuration) {
        this.snackBar.openFromTemplate(template, {
            duration,
            data
        });
    }
}
