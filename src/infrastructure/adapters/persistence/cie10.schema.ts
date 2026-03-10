import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('cie10')
export class Cie10Schema {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: true })
  code_0: string;

  @Column({ nullable: true })
  code_1: string;

  @Column({ nullable: true })
  code_2: string;

  @Column({ nullable: true })
  code_3: string;

  @Column({ nullable: true })
  code_4: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Column()
  level: number;

  @Column()
  source: string;
}
