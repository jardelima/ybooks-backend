import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Copy } from "./copy.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    title!: string;

    @Column("varchar")
    author!: string;

    @Column("varchar")
    isbn!: string;

    @OneToMany(() => Copy, (copy) => copy.book)
    copys!: Copy[];
}
