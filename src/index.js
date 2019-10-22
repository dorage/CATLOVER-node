import dotenv from 'dotenv';
import httpsServer from './express';

dotenv.config();

const port = process.env.PORT || 4000;

const handleListen = () => {
    console.log(`Listening On : http://localhost:${port}`);
};

httpsServer.listen(port, handleListen);
