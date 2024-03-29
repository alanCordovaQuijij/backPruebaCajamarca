import { prisma } from "../../data/postgres";
import { CreatePhotoDto } from "../../domain/dtos/todos/create-photo.dto";
import { Request, Response } from "express";


export class PhotosController {

    constructor() {}


    public createPhoto = async (req: Request, res: Response) => {
        //const [error, createPhotoDto] = CreatePhotoDto.create(req.body);
    
       // if (error) return res.status(400).json({ error });
       console.log("BODY==========>:", req.body);
       const {id, title, url} = req.body;

    
        const photo = await prisma.photos.create({
          data: {
            id: id,
            title: title,
            url: url
          }
        });
    
        res.json(photo);
      };


      public getPhotos = async (req: Request, res: Response) => {
        const photos = await prisma.photos.findMany();
    
        return res.json(photos);
      };
    




}