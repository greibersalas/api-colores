import express, {Application} from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import connect from './database';

const { mongoDBURI } = require('./config');
import colorRoutes from './routes/colorRoutes';

class App{
    private app: Application;
    // Ruta de la base de datos
    private db: string = mongoDBURI;
    constructor(){
        this.app = express();
        //Conectamos con la base de datos
        connect(this.db);
        this.config();
        this.routes();
    }
    // Config
    config(): void{
        this.app.set('port', process.env.PORT || 6200);
        this.app.use(morgan('dev'));//Para ver las peticiones realizadas
        this.app.use(cors());
        this.app.use(express.json()); //Para aceptar formatos json
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }
    // Routes
    routes(): void{
        this.app.use('/api/color',colorRoutes);
    }
    // start app
    start(): void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port', this.app.get('port'));
        });
    }

}
const app = new App();
app.start();