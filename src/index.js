import Server from './ExpressApp';

const port = process.env.PORT || 80;

const handleListen = () => {
    console.log(`Listening On : http://localhost:${port}`);
};

Server.listen(port, handleListen);
