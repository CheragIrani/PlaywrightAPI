import { APIRequestContext } from "@playwright/test";

export class ApiClient{
    protected readonly request: APIRequestContext
    protected token?: string

    constructor(request: APIRequestContext, token?: string){
        this.request = request
        this.token = token
    }

    protected async authHeader(): Promise<{}>{
        return this.token ? {'Authorization' : `Bearer ${this.token}`} : {}
    }


}