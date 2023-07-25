import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateStaffDto } from '../dto/update-staff.dto';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({})
export class StaffsService {
  constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) { }
  async create(createStaffDto: CreateStaffDto) {
    try {
      const data = {
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        age: createStaffDto.age,
        account_number: createStaffDto.account_number
      };
      // insert to db
      const newStaff = this.staffRepository.create(data);
      const getStaff = await this.staffRepository.save(newStaff);
      return { data: getStaff };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll(pageNumber: number = 1, limit: number = 10) {
    const skip = (pageNumber - 1) * limit;
    const getAllStaff = await this.staffRepository.find({
      order: {
        id: "DESC",
      },
      skip: skip,
      take: limit,
    });
    const formattedResults = getAllStaff.map(result => ({
      ...result
    }));

    return { data: formattedResults };
  }

  async findOne(id: number) {
    const getStaffById = await this.staffRepository.findOneBy({ "id": id });
    if (!getStaffById) {
      throw new NotFoundException(`Staff with id ${id} not found`);
    }
    return { data: getStaffById };
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    try {
      const findStaffById = await this.staffRepository.findOneBy({ "id": id });
      if (!findStaffById) {
        throw new NotFoundException(`Staff with id ${id} not found`);
      }
      findStaffById.first_name = updateStaffDto.first_name;
      findStaffById.last_name = updateStaffDto.last_name;
      findStaffById.age = updateStaffDto.age;
      findStaffById.account_number = updateStaffDto.account_number;
      const getStaffAfterUpdate = await this.staffRepository.save(findStaffById);
      return { data: getStaffAfterUpdate };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }

  async remove(id: number) {
    const result = await this.staffRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Staff with id ${id} not found`);
    }
    return {msg: "Staff id: "+id+" deleted!"};
  }
}
