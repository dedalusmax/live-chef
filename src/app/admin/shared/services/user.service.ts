import { Injectable } from '@angular/core';

import { AppSettings } from '../../../app.settings';
import { WebApiService } from '../../../shared/services/web-api.service';

import { User } from '../models/user';

@Injectable()
export class UserService {

    private apiPath: string;

    constructor(
       private appSetting: AppSettings,
       private webApiService: WebApiService
    ) {
        this.apiPath = appSetting.webApi + 'users';
    }

    getUsers() {
        return this.webApiService.getList(this.apiPath + '/getall');
    }

    login(user: User) {
        return this.webApiService.save<User>(this.apiPath + '/login', user);
    }
}
