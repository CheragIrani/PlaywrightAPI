import{test as base, expect} from '@playwright/test'
import { ContactPayload } from '../data/contact.payload'
import { UserPayload } from '../data/user.payload'
import { UsersApi } from '../api/users.api'
import { ContactsApi } from '../api/contacts.api'

type APIFixtures = {
    contactPayload: ContactPayload,
    userPayload: UserPayload
    usersApi: UsersApi
    contactApi: ContactsApi
}

export const apiTest = base.extend<APIFixtures>({
    contactPayload : async ({}, use) => {
        const contactPayload = {
            firstName: 'John',
            lastName: 'Morley',
            birthdate: '1980-06-21',   // YYYY-MM-DD
            email: `email${Date.now()}@example.com`,
            phone: '01987678678',
            street1: '25 London Road',
            street2: '',
            city: 'London',
            stateProvince: 'Middlesex',
            postalCode: 'AD34FG',
            country: 'UK',

        }
        await use(contactPayload)

    },
    userPayload : async ({}, use) => {
        const userPayload = {
            firstName: 'Michael',
            lastName: 'Peters',
            email: `b.sutton${Date.now()}@example.com`,
            password: 'Password123!'

        }
        await use(userPayload)
        
    },
    usersApi: async ({request}, use) => {
        const usersApi = new  UsersApi(request)
        await use(usersApi)
    },
    contactApi: async ({request}, use) => {
        const contactApi = new  ContactsApi(request)
        await use(contactApi)
    }
})

export { expect }