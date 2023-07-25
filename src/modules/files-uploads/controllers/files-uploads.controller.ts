import { Controller, UploadedFile, Post, UseInterceptors, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadsService } from '../services/files-uploads.service';
import { BufferedFile } from 'src/minio-client/interfaces/file.model';

@Controller('files-uploads')
export class FilesUploadsController {
  constructor(
    private readonly fileUploadsService: FilesUploadsService,
  ) {}
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: BufferedFile) {
    return await this.fileUploadsService.uploadFile(file);
  }

  @Get('fetch-file/:id')
  async fetchFile(@Param('id') id: number) {
    return  await this.fileUploadsService.getFileUpload(id);
    // file.pipe(res);
  }

  @Get('list-file')
  async getAllFile() {
    return await this.fileUploadsService.getFiles();
  }
}
