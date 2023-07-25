import { Test, TestingModule } from '@nestjs/testing';
import { FilesUploadsController } from './files-uploads.controller';
import { FilesUploadsService } from '../services/files-uploads.service';

describe('FilesUploadsController', () => {
  let controller: FilesUploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesUploadsController],
      providers: [FilesUploadsService],
    }).compile();

    controller = module.get<FilesUploadsController>(FilesUploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
