import { v4 as uuid } from 'uuid';
import { Response, Request } from 'express';
import ProductMapper from '../../data_mappers/ProductMapper';
import ApplicationError from '../../domain/shared/object_values/ApplicationError';
import ProductFactory from '../../factories/ProductFactory';
import APIResponse from '../dto/APIResponse';
import Product from '../../domain/context/entities/Product';

export default class ProductController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const service = ProductFactory.generateService();
    const products = await service.getAll();

    if (products.length === 0) {
      return response
        .status(404)
        .json(
          APIResponse.withError(
            new ApplicationError(
              'Controller > GetAll',
              'NENHUM_PRODUTO_CADASTRADO',
              404,
              []
            )
          )
        );
    }

    const dataToReturn = products.map((product) =>
      ProductMapper.fromDomainToPresentation(product)
    );
    return response.status(200).json(APIResponse.withSuccess(dataToReturn));
  }

  public async deleteProducts(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { category } = request.params;
    const service = ProductFactory.generateService();
    const message = await service.deleteProducts(category);

    return response.status(200).json(APIResponse.withSuccess(message));
  }

  public async saveProduct(
    request: Request,
    response: Response
  ): Promise<Response> {

    if (!request.body.name) {
      return response.status(400).json(APIResponse.withError(new ApplicationError(
        'Presentation > SaveProduct',
        'faltou o name',
        400,
        []
      )));
    }

    const productToSAve = ProductFactory.generateEntity(request.body.category, request.body.name, request.body.price)

    const service = ProductFactory.generateService();
    const product = (await service.saveProduct(productToSAve)) as Product;

    return response.status(200).json(APIResponse.withSuccess(ProductMapper.fromDomainToPresentation(product)));
  }
}
