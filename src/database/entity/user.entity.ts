import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: "varchar", length: 11, nullable: false })
    cpf;

    @Column({ type: "text" })
    name;

    @Column({ type: "varchar", length: 8 })
    birthday;

    @Column({ type: "text" })
    address;

    constructor(id: number, cpf: string, name: string, birthday: string, address: string) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.birthday = birthday;
        this.address = address;
    }
}
