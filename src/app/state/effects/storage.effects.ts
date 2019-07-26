import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LocalStorageReaderService } from 'src/app/shared/services/local-storage/local-storage-reader.service';
import { LocalStorageWriterService } from 'src/app/shared/services/local-storage/local-storage-writer.service';
import * as storageActions from './../actions/storage.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class StorageEffects {
	constructor(
		private actions$: Actions,
		private storageReaderService: LocalStorageReaderService,
		private storageWriterService: LocalStorageWriterService
	) {}

	@Effect()
	initStorage$ = this.actions$.pipe(
		ofType<storageActions.Load>(storageActions.StorageActionTypes.Load),
		map(() => {
			const settings = this.storageReaderService.getLocalStorage();
			return new storageActions.LoadComplete(settings);
		})
	);
	@Effect()
	updateStorage$ = this.actions$.pipe(
		ofType<storageActions.UpdateStorage>(storageActions.StorageActionTypes.UpdateStorage),
		map(action => action),
		switchMap(action => {
			const settings = this.storageReaderService.getLocalStorage();
			this.storageWriterService.writeToStorage(action.key, action.value);
			return [new storageActions.UpdateStorageComplete(settings)];
		})
	);
}