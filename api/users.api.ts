import { APIRequestContext } from "@playwright/test"
import { UserPayload } from "../data/user.payload"
import { LoginResponse } from "../data/user.response"
import { ApiClient } from "./apiClient"

export class UsersApi extends ApiClient{

    async createUser(userPayload: UserPayload){
        const resp = await this.request.post('/users', {
            data: userPayload
        })
        const status = resp.status()
        if(status >= 400){ throw new Error(`POST /users failed with status ${status}`)}

        const body = await resp.json();
        return body

    }

    async login(loginPayload: Pick<UserPayload, 'email' | 'password'>): Promise<LoginResponse>{
        const resp = await this.request.post('/users/login', {
            data: loginPayload
        })
        const status = resp.status()
        if(status >= 400){ throw new Error(`POST /users/login failed with status ${status}`)}
        const body: LoginResponse = await resp.json() as LoginResponse;
        console.log('Login response is ', body)
        return body;

    }

    async deleteUser(){
        const resp = await this.request.delete('/users/me', {
            headers: await this.authHeader()
        })
        const status = resp.status()
        const body = await resp.text()
        if(status >= 400){ throw new Error(`DELETE /users/me failed with status ${status}`)}
        console.log('DELETE /users/me text is ', body)
        
    }

}