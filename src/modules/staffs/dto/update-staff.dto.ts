import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateStaffDto {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsNumber()
    @IsNotEmpty()
    age: number

    @IsNumber()
    @IsNotEmpty()
    account_number: number
}
