import { Request, Response, NextFunction } from 'express';
import { saveContact } from '../models/contact';
import { PrismaClient } from '@prisma/client';
import db from '../config/db';
import { sendEmail } from '../services/emailService';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const addContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        console.log('Contact Form Data:', req.body);

        // Use Prisma to insert contact data into the database
        const newContact = await prisma.contacts.create({
          data: {
              name,
              email,
              message,
              created_at: new Date(),
          },
        });
        console.log('Contact data saved to the database:', newContact);

        const subject = `New Contact Message from ${name}`;
        const text = `
          You have received a new message from your website contact form:
    
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `;
        await sendEmail('canadasupplyboard@gmail.com', subject, text);

        console.log('Email sent');

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error handling contact message:', error);
        res.status(500).json({ error: 'Something went wrong, please try again.' });
    } finally {
      await prisma.$disconnect();
    }
};

export default addContact;
