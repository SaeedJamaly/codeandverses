import express from 'express';
import addContact from '../controllers/contactController';

const router = express.Router();

router.post('/', addContact);

export default router;