import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
export default class ProductEntity extends BaseEntity {
  @PrimaryColumn()
  public uid!: string;

  @Column()
  public name!: string;

  @Column()
  public category!: string;

  @Column()
  public price!: number;
}
