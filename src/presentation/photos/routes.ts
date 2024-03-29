import { Router } from 'express';
import { PhotosController } from './Controller';


export class PhotoRoutes {


  static get routes(): Router {

    const router = Router();

    const photoController = new PhotosController();

    router.get('/', photoController.getPhotos );
    router.post('/', photoController.createPhoto );
 


    return router;
  }


}

