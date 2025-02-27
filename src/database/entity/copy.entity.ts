import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Book } from "./books.entity";

@Entity()
export class Copy {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("boolean")
    status!: boolean;

    @ManyToOne(() => Book, (book) => book.copys)
    book!: Book;
}
