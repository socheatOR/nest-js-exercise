import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { config } from './config';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './interfaces/file.model';
import * as crypto from 'crypto'

@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = config.MINIO_BUCKET

    public get client() {
        return this.minio.client;
    }

    constructor(
        private readonly minio: MinioService,
    ) {
        this.logger = new Logger('MinioStorageService');
    }

    public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
        if (!(file?.mimetype.includes('excel')
            || file?.mimetype.includes('spreadsheetml') || file?.mimetype.includes('pdf'))) {
            throw new HttpException(
                'File type not supported',
                HttpStatus.BAD_REQUEST,
            );
        }
        let temp_filename = Date.now().toString()
        let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };
        let filename = hashedFileName + ext
        const fileName: string = `${filename}`;
        const fileBuffer = file.buffer;
        this.client.putObject(baseBucket, fileName, fileBuffer, metaData, function (err, res) {
            if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
        })

        return {
            url: `${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${config.MINIO_BUCKET}/${filename}`
        }
    }

    async delete(objetName: string, baseBucket: string = this.baseBucket) {
        this.client.removeObject(baseBucket, objetName, function (err, res) {
            if (err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
        })
    }
    async getFile(objetName: string, baseBucket: string = this.baseBucket) {
        const stream = await this.client.getObject(baseBucket, objetName);
        
        let base64Data: any = [];
        const test =  await new Promise((resolve, reject) => {
            stream.on('data', (chunk: Buffer) => {
                base64Data.push(chunk);
            });

            stream.on('end', () => {
                resolve(Buffer.concat(base64Data));
            });

            stream.on('error', (err) => {
                reject(err);
            });
        }) as any;
        return test.toString("base64");



        // const chunks: any = [];
        // const resBuffer = (await new Promise((resolve) => {
        //     stream.on('data', (chunk) => {
        //         chunks.push(chunk);
        //     });

        //     stream.on('end', () => {
        //         const result = Buffer.concat(chunks);
        //         resolve(result);
        //     });
        // })) as any;

        // return resBuffer.toString("base64");
    }
}
