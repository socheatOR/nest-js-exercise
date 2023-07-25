import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesUpload } from '../entities/files-upload.entity';
import { Repository } from 'typeorm';
import { BufferedFile } from 'src/minio-client/interfaces/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable({})
export class FilesUploadsService {
  constructor(
    private minioClientService: MinioClientService,
    @InjectRepository(FilesUpload) private fileUploadRepository: Repository<FilesUpload>,
  ) { }

  async uploadFile(file: BufferedFile) {
    
    let UploadedFile = await this.minioClientService.upload(file);

    const data = {
      file_name: file.originalname,
      file_path: UploadedFile.url,
    };

    // insert to db
    const newFile = this.fileUploadRepository.create(data);
    const getFile = await this.fileUploadRepository.save(newFile);
    return { data: getFile };
  }

  async getFileUpload(id: number) {
    const getFileUpload = await this.fileUploadRepository.findOneBy({"id": id});
    const pathParts = getFileUpload.file_path.split('/'); // Split the file path by '/'
    const filename = pathParts[pathParts.length - 1]; // Get the last element of the array
    let UploadedFile = await this.minioClientService.getFile(filename);
    return UploadedFile;
    // return {data: 'data-image:'+UploadedFile};
  }
  async getFiles() {
    const getAllFile = await this.fileUploadRepository.find();
    return { data: getAllFile };
  }

}
