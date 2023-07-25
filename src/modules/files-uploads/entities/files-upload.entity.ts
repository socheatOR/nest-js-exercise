import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('file_uploads')
export class FilesUpload {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 100})
    file_name: string

    @Column({type: 'varchar', length: 250})
    file_path: string
}
