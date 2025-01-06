import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    // 1. Create a new contact
    const newContact = await prisma.contacts.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        message: 'This is a test message.',
      },
    });
    console.log('New contact created:', newContact);

    // 2. Retrieve the contact by id
    const contact = await prisma.contacts.findUnique({
      where: { id: newContact.id },
    });
    console.log('Retrieved contact:', contact);

    // 3. Update the contact's message
    const updatedContact = await prisma.contacts.update({
      where: { id: newContact.id },
      data: {
        message: 'Updated test message.',
      },
    });
    console.log('Updated contact:', updatedContact);

    // 4. Delete the contact
    const deletedContact = await prisma.contacts.delete({
      where: { id: newContact.id },
    });
    console.log('Deleted contact:', deletedContact);
  } catch (error) {
    console.error('Error interacting with the contacts table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testPrisma();
