import { Module } from '@nestjs/common';
import { StaffsService } from './services/staffs.service';
import { StaffsController } from './controllers/staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffsController],
  providers: [StaffsService]
})
export class StaffsModule {}
