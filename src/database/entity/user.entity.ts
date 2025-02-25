import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 11, nullable: false })
    cpf!: string;

    @Column({ type: "text" })
    name!: string;

    @Column({ type: "varchar" })
    birthday!: string;

    @Column({ type: "text" })
    address!: string;
}
