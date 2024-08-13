import crypto from 'crypto';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AWS_S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, AWS_REGION } from '../../constants';
import { CustomError } from './customError';


export class AwsS3 {
   static s3 = new S3Client({
     credentials: {
       accessKeyId: AWS_ACCESS_KEY_ID,
       secretAccessKey: AWS_SECRET_KEY,
     },
     region: AWS_REGION,
   })

  static putFile = async (body: Buffer, content_type: string, prefix?: string) => {
     try {

      console.log(typeof body);

       const fileName = prefix ? `${prefix}-` + AwsS3.randomFileName() : AwsS3.randomFileName();
       const data = {
         Bucket: AWS_S3_BUCKET_NAME,
         Key: fileName,
         Body: body,
         ContentType: content_type}
       const command = new PutObjectCommand(data)

       await AwsS3.s3.send(command)
       return fileName
     }catch(e) {
       console.log(e)
       throw new CustomError({message: "sth went wrong", code: 500})
     }
  }

  static getFile = async (fileName: string) => {
     try {
       const getObjectParams = {
         Bucket: AWS_S3_BUCKET_NAME,
         Key: fileName,
       }
       const command = new GetObjectCommand(getObjectParams);
       const url =  await getSignedUrl(AwsS3.s3, command, { expiresIn: 3600 });
       console.log(url)
       return url
     }catch (e) {
       console.log(e)
       return ''
     }
  }

  static randomFileName = () => {
    return crypto.randomBytes(64).toString('hex')
  }
}