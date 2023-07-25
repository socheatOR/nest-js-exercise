import { Module } from '@nestjs/common';
import { StaffsModule } from './modules/staffs/staffs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { FilesUploadsModule } from './modules/files-uploads/files-uploads.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    StaffsModule,
    FilesUploadsModule,
    MinioClientModule,
  ]
})
export class AppModule {}
