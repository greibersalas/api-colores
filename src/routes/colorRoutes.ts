import { Router } from 'express';
import { colorController } from '../controllers/colorController';

class ColorRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', colorController.index);
        this.router.get('/:id', colorController.getOne);
        this.router.post('/', colorController.add);
        this.router.delete('/:id', colorController.delete);
        this.router.put('/:id', colorController.update);
    }
}

const colorRoutes = new ColorRoutes();

export default colorRoutes.router;