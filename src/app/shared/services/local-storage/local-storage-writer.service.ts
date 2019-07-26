import { Injectable } from '@angular/core';
import { LocalStorageReaderService } from './local-storage-reader.service';
import { LocalStorage } from './local-storage';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Injectable()
export class LocalStorageWriterService {
	private userId: number;
	constructor(
		private authenticationService: AuthenticationService,
		private localStorage: LocalStorage,
		private localStorageReaderService: LocalStorageReaderService
	) {
		this.authenticationService.profile.subscribe(profile => {
			if (profile) {
				this.userId = profile.sub;
			}
		});
	}

	writeToStorage(key: string, value: any): void {
		const items = this.localStorageReaderService.getLocalStorage();
		items.set(key, value);
		this.localStorage.set(`${LocalStorage.localStorageKey}_${this.userId}`, JSON.stringify(Array.from(items.entries())));
	}
}