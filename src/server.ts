import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
