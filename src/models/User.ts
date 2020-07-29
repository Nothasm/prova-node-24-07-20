import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsOptional, IsString, IsEmail } from "class-validator";

@Entity()
export class User {

    @IsOptional()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsString()
    @Column()
    name: string;

    @IsEmail()
    @Column({ unique: true })
    email: string;

    @IsString()
    @Column({ unique: true })
    username: string;

}