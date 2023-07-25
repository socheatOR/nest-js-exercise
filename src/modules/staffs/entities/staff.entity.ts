import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('staffs')
export class Staff {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100 })
    first_name: string

    @Column({ type: 'varchar', length: 100 })
    last_name: string

    @Column({ type: 'integer' })
    age: number

    @Column({ type: 'double precision', unique: true })
    account_number: number
}
