import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({
  name: "users",
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  nickname: string;

  @Column()
  job: string;

  @Column()
  avatar: string;

  @Column()
  introduce: string;
}
