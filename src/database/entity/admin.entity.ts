import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    user!: string;

    @Column("varchar")
    password!: string;

    @Column("boolean")
    is_admin!: boolean;
}
