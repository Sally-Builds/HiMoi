import { Request, Response } from 'express';
import { CustomError, CustomResponse } from '../helpers/lib/App';
import { AwsS3 } from '../helpers/lib/App/aws-upload';
import axios from 'axios';
import { ResponseMessage } from '../helpers/constants';


export const publicMiddleware = async (req: Request, res: Response) => {
  try {
    const imageUrl = await AwsS3.getFile(req.params.fileUrl);

    const response = await axios.get(imageUrl, { responseType: 'stream' });

    console.log(imageUrl)

    res.set('Content-Type', response.headers['content-type']);
    res.set('Content-Length', response.headers['content-length']);

    response.data.pipe(res);
  }
  catch (e) {
    throw new CustomError({message: ResponseMessage.NOT_FOUND});
  }

}
