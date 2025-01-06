"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const emailService_1 = require("../services/emailService");
const addContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        console.log('Contact Form Data:', req.body);
        // Call the stored procedure to insert the contact data into the database
        yield db_1.default.execute('CALL AddContact(?, ?, ?)', [name, email, message]);
        console.log('Contact data saved on the database');
        const subject = `New Contact Message from ${name}`;
        const text = `
          You have received a new message from your website contact form:
    
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `;
        yield (0, emailService_1.sendEmail)('canadasupplyboard@gmail.com', subject, text);
        console.log('Email sent');
        res.status(200).json({ message: 'Message sent successfully!' });
    }
    catch (error) {
        console.error('Error handling contact message:', error);
        res.status(500).json({ error: 'Something went wrong, please try again.' });
    }
});
exports.default = addContact;
