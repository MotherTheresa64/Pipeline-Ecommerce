export interface UserData {
  email: string;      // Required; user's email stored in Firestore for identification
  name?: string;      // Optional; user's full name
  address?: string;   // Optional; user's physical or mailing address
  phone?: string;     // Optional; user's phone number for contact
}
