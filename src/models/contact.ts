import db from '../config/db';

interface Contact {
  name: string;
  email: string;
  message: string;
}

export const saveContact = async (contact: Contact) => {
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  await db.execute(query, [contact.name, contact.email, contact.message]);
};
