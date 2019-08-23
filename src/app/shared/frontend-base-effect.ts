import { ComponentType } from '@angular/cdk/portal';
import { MatSnackBarConfig } from '@angular/material';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CustomError } from './models/CustomError';
import { SnackbarWrapperService } from './services/snackbar-wrapper-service';
import { GeneralErrorsComponent } from './components/general-errors/general-errors.component';

export class FrontendBaseEffect {
    config: MatSnackBarConfig<string>;
    constructor(public snackbarWrapperService: SnackbarWrapperService) { }

    handleError<T>(action: Action, error: any, component: ComponentType<T>): Observable<Action> {
        if (this.isCustomError(error)) {
            const customError = error as CustomError;
            if (customError) {
                this.snackbarWrapperService.openFromComponent<T, CustomError>(component, customError);
            }
        } else {            
            this.snackbarWrapperService.openFromGenericErrorComponent<any>(error);
        }
        return of(action);
    }

    private isCustomError(jsonString) {
        return jsonString ? jsonString.hasOwnProperty('key') && jsonString.hasOwnProperty('message') : false;
    }
}
