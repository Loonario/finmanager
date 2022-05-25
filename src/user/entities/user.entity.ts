import { ApiTags } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ApiTags('users')
@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({unique: true})
    name: string

    @Column()
    hash: string

    @CreateDateColumn({type: 'timestamptz', name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({type: 'timestamptz', name: 'updated_at'})
    updatedAt: Date;
}
