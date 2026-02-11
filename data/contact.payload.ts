export type ContactPayload = {
  firstName: string;
  lastName: string;
  birthdate: string;     // YYYY-MM-DD
  email: string;
  phone: string;
  street1: string;
  street2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
};
