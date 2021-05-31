import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Classification, ClassificationEntity} from "./classification.entity";
import {Contact, ContactEntity} from "./contact.entity";

export interface Person {
  id: number
  gender: 'male'|'female'
  title: string
  firstName: string
  middleName: string
  lastName: string
  contactDetails: Contact
  dob: Date
  classification: Classification
}

export type Gender = 'male' | 'female';

@Entity('people')
export class PersonEntity implements Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'enum', enum: ['male', 'female']})
  gender: Gender;

  @Column({nullable: true})
  title: string

  @Column()
  firstName: string;

  @Column({nullable: true})
  middleName: string;

  @Column({nullable: true})
  lastName: string

  @Column(type => ContactEntity, {prefix: 'contact'})
  contactDetails: ContactEntity;

  @Column({nullable: true})
  dob: Date;

  @ManyToOne(() => ClassificationEntity, {nullable: true})
  classification:ClassificationEntity;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({nullable: true})
  updatedAt: Date
}

