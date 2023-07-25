import { Test, TestingModule } from '@nestjs/testing';
import { FilesUploadsService } from './files-uploads.service';

describe('FilesUploadsService', () => {
  let service: FilesUploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesUploadsService],
    }).compile();

    service = module.get<FilesUploadsService>(FilesUploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
