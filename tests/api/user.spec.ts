import { GetContactResponse } from '../../data/contact.response';
import { LoginResponse } from '../../data/user.response';
import { apiTest, expect } from '../../fixtures/api.fixtures';


apiTest.beforeEach('Login', async ({usersApi, userPayload}) => {
  await apiTest.step('Login', async () => {
      const loginResp: LoginResponse = await usersApi.login(userPayload);
      expect(loginResp.user.email).toBe(userPayload.email)
      expect(typeof loginResp.user.firstName).toBe('string');
    });

})

apiTest.afterEach('Delete User', async ({ usersApi }) => {
  await apiTest.step('Login', async () => {
      await usersApi.deleteUser();
    });

})

apiTest('Create a user → login → create a contact → fetch contacts → delete contact', async ({ contactApi, contactPayload }) => {
    let contactId: string

    await apiTest.step('Create Contact', async () => {
      const createContactResp = await contactApi.createContact(contactPayload);
      contactId = createContactResp._id
      const getContactAfterCreate: GetContactResponse[] = await contactApi.getContact();
      let id = getContactAfterCreate.find(c => c._id === contactId);
      expect(id).toBeDefined()
    });

    await apiTest.step('Delete Contact', async () => {
      await contactApi.deleteContact(contactId);
      const getContactAfterDelete: GetContactResponse[] = await contactApi.getContact();
      let id = getContactAfterDelete.find(c => c._id === contactId);
      expect(id).toBeUndefined()
      
      
    });
    
    
    
    
    

  
});
