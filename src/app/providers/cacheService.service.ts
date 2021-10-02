import { Injectable } from '@angular/core';

import {Locker, DRIVERS} from 'angular-safeguard';

@Injectable()
export class CacheService {
	
	constructor(public _locker: Locker) {}
	public setCacheData(key, value){
			const obj = value;
			this._locker.set(DRIVERS.SESSION, key, value);
	}
	public getCacheData(key){
		return	this._locker.get(DRIVERS.SESSION, key);
	}

			
}
