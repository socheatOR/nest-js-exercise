import { Module } from '@nestjs/common';
import { FilesUploadsService } from './services/files-uploads.service';
import { FilesUploadsController } from './controllers/files-uploads.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FilesUpload } from './entities/files-upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
@Module({
  imports: [
    MinioClientModule,
    TypeOrmModule.forFeature([FilesUpload]),
  ],
  controllers: [FilesUploadsController],
  providers: [FilesUploadsService]
})
export class FilesUploadsModule {}
