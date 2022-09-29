import express , {Application} from 'express';
import connection from '../db/connection';
import routesPersonas from '../routes/persona.routes';
import cors from 'cors';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Aplicacion corriendo por el puerto',this.port);
        })
    }
    //funciones q se ejecutan antes q la peticion llegue al servidor
    middlewares(){
        //parseo del body
            this.app.use(express.json());

        //cors
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/personas',routesPersonas)
    }

    conectarDB(){
        connection.connect((err) =>{
            if(err) throw err;
            console.log('Conectado a la Base de Datos')
        })
    }
}

export default Server;
