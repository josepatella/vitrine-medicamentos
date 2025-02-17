import { User } from './User';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class Medicamento {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    nome: string

    @Column()
    descricao: string

    @Column({ nullable: false })
    quantidade: number

    @Column()
    userId: number

    @OneToOne(()=> User)
    @JoinColumn()
    user: User
}