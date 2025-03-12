import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Copy } from "./copy.entity";
import { User } from "./user.entity";

@Entity()
export class Rental {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, (user) => user.id)
    user!: User; // Relacionamento com o usuário que está alugando o livro

    @ManyToOne(() => Copy, (copy) => copy.id)
    copy!: Copy; // Relacionamento com a cópia do livro que está sendo alugada

    @Column("date")
    rentalDate!: Date; // Data do aluguel

    @Column("date")
    returnDate!: Date; // Data de devolução (se devolvido)

    @Column("boolean", { default: false })
    isActive!: boolean; // Controle se o aluguel está ativo (não devolvido)
}
