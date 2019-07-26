export abstract class LocalStorageBase {
	abstract getWithSession(companyId: number, userId: number, key: string): any;
	abstract setWithSession(companyId: number, userId: number, key: string, value: any): void;
	abstract get(key: string): any;
	abstract set<T>(key: string, value: any): void;
	abstract remove(key: string): void;
	abstract getKeySession(companyId: number, userId: number, key: string): string;
}
