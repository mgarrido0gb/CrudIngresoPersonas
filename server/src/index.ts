import Server from "./models/server";
import dotenv from 'dotenv';

export{};
//configuramos dotenv
dotenv.config();

const server = new Server();

server.listen();