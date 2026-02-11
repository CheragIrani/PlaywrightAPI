import { APIRequestContext } from "@playwright/test";
import { ContactPayload } from "../data/contact.payload";
import { GetContactResponse } from "../data/contact.response";
import { ApiClient } from "./apiClient";

export class ContactsApi extends ApiClient{

    async createContact(contactPayload: ContactPayload) {
        const resp = await this.request.post('/contacts', {
            headers: await this.authHeader(),
            data: contactPayload

        })
        const status = resp.status()
        if(status >= 400){ throw new Error(`POST /contacts failed with status ${status}`)}

        return await resp.json()

    }

    async getContact(): Promise<GetContactResponse[]> {
        const resp = await this.request.get('/contacts', {
            headers: await this.authHeader()
        })
        const status = resp.status()
        if(status >= 400){ throw new Error(`GET /contacts failed with status ${status}`)}

        return await resp.json() as GetContactResponse[]

    }

    async deleteContact(id: string){
        const resp = await this.request.delete(`/contacts/${id}`, {
            headers: await this.authHeader()
        })
        const status = resp.status()
        if(status >= 400){ throw new Error(`DELETE /contacts/${id} failed with status ${status}`)}

    }

}