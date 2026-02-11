import { ContactsApi } from '../../api/contacts.api';
import { UsersApi } from '../../api/users.api';
import { GetContactResponse } from '../../data/contact.response';
import { LoginResponse } from '../../data/user.response';
import { apiTest, expect } from '../../fixtures/api.fixtures';

apiTest.describe('Login => Create and Delete Contacts', async () => {
  let contactId: string
  let contactAPI: ContactsApi
  let userAPI: UsersApi
  let token: string

  apiTest.afterEach('Delete use', async () => {
    await userAPI.deleteUser()

  })

  apiTest('Create a user → login → create a contact → fetch contacts → delete contact', async ({ request, userPayload, usersApi, contactPayload }) => {
      const createResp = await usersApi.createUser(userPayload);
      expect(typeof createResp.token).toBe('string')
    
      const loginResp: LoginResponse = await usersApi.login(userPayload);
      expect(loginResp.user.email).toBe(userPayload.email)
      expect(typeof loginResp.user.firstName).toBe('string');
      token = loginResp.token;
      userAPI = new UsersApi(request, token)
      contactAPI = new ContactsApi(request, token)
  
      const createContactResp = await contactAPI.createContact(contactPayload);
      contactId = createContactResp._id
      const getContactAfterCreate: GetContactResponse[] = await contactAPI.getContact();
      let id = getContactAfterCreate.find(c => c._id === contactId);
      expect(id).toBeDefined()
  
      await contactAPI.deleteContact(contactId);
      const getContactAfterDelete: GetContactResponse[] = await contactAPI.getContact();
      let idAfterDelete = getContactAfterDelete.find(c => c._id === contactId);
      expect(idAfterDelete).toBeUndefined()


  });

})

