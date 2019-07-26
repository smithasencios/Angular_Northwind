import { Injectable } from '@angular/core';
import { LocalStorageBase } from './local-storage-base';

@Injectable()
export class LocalStorage extends LocalStorageBase {
	static localStorageKey: string = 'APP_NORTHWIND';

	constructor() {
		super();
	}

	getWithSession(companyId: number, userId: number, key: string): any {
		return this.get(this.getKeySession(companyId, userId, key));
	}
	setWithSession(companyId: number, userId: number, key: string, value: any): void {
		return this.set(this.getKeySession(companyId, userId, key), value);
	}
	get(key: string): any {
		return JSON.parse(localStorage.getItem(key));
	}
	set<T>(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	}
	remove(key: string): void {
		localStorage.removeItem(key);
	}
	getKeySession(companyId: number, userId: number, key: string): string {
		return `${companyId}_${userId}_${key}`;
	}
}