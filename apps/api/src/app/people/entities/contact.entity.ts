import {Column} from "typeorm";

export class ContactEntity implements Contact{
  @Column({nullable: true})
  email: string;

  @Column({name: 'mobile', nullable: true})
  mobileNo: string;

  @Column({name: 'home', nullable: true})
  homeNo: string;

  @Column({name: 'work', nullable: true})
  workNo: string
}

export interface Contact {
  email: string;
  mobileNo: string;
  homeNo: string;
  workNo: string;
}
