import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Injectable()
export class LocalStorageReaderService {
	private userId: number;
	constructor(private authenticationService: AuthenticationService, private localStorage: LocalStorage) {
		this.authenticationService.profile.subscribe(profile => {
			if (profile) {
				this.userId = profile.sub;
			}
		});
	}

	getLocalStorage(): Map<string, any> {
		const localStorageValue = JSON.parse(this.getStorageValue(`${localStorage.localStorageKey}_${this.userId}`));
		const store = localStorageValue || [];
		return new Map<string, any>(store);
	}

	private getStorageValue(key: string): any {
		return this.localStorage.get(key);
	}
}