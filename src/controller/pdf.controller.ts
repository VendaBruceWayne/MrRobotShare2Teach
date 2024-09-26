import  {Request, Response} from "express"; 
import multer from "multer";
import {extname} from "path"

export const Upload = async (req: Request, res: Response) => {
    const storage = multer.diskStorage({
        destination:'./uploads',
        filename(req, file, cb){ 
            return cb(null, `${Date.now()}-${extname(file.originalname)}`);
            
        }

    });

    const upload =multer({storage}).single('pdf');

    upload(req, res, (err) =>{
        if (err){
            return res.send(400).send(err)
        }
        res.send({
            url: 'http://localhost:8000/api/uploads/${req.file.filename}'
        })

    })
    

}