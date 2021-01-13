import Product from '../domain/context/entities/Product';
import ProductFactory from '../factories/ProductFactory';
import ProductEntity from '../infra/database/entities/ProductEntity';

export default class ProductMapper {
  public static fromRepositorieToDomain(productEntity: ProductEntity): Product {
    const product = ProductFactory.generateEntity(
      productEntity.category,
      productEntity.name,
      productEntity.price,
      productEntity.uid
    );
    return product;
  }

  public static fromDomainToRepository(product: Product): ProductEntity {
    const entity = new ProductEntity()
    entity.uid = product.uid;
    entity.category = product.category;
    entity.name = product.name;
    entity.price = product.price;
    return entity;
  }

  public static fromDomainToPresentation(
    product: Product
  ): { uid: string; category: string; name: string; price: number } {
    const productDTO = {
      uid: product.uid,
      category: product.category,
      name: product.name,
      price: product.price,
    };
    return productDTO;
  }
}
