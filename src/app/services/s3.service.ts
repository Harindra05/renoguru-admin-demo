import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadS3Service {
  constructor() {}
  bucket:any;
 async uploadFile(file: any, filePath: any) {
    console.log(file);
    
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: 'AKIAZKYXAHB4WE2IOGJC',
        secretAccessKey: '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',
        region: 'us-east-1'
      });
      const params = {
        Bucket: environment.s3url,
        Key: filePath,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
      };
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
 async deleteFile(file:any) {
    var aa=file.split(".com/")
    var img=aa[1].split("/")
    console.log(img[1]);
    console.log(aa[1]);
   const str=aa[1].replace(/%20/g, " ");
   console.log(str);
    // console.log(aa[1]);
    if(img[1]){
      const params = {
        Bucket: environment.s3url,
        Key:str,
      };
         const bucket = new S3(
        {
          accessKeyId: 'AKIAZKYXAHB4WE2IOGJC',
          secretAccessKey: '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',
          region: 'us-east-1'
        }
      );
      bucket.deleteObject(params, (error:any, data:any) => {
        // console.log(data,error);
        if (error) {
          console.log('Successfully Delete file.', error);
        }
        console.log("File has been deleted successfully");
      });
    }
  }
}