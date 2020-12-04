import { Response, Request } from 'express';
import ProductMapper from '../../data_mappers/ProductMapper';
import ApplicationError from '../../domain/shared/object_values/ApplicationError';
import ProductFactory from '../../factories/ProductFactory';
import APIResponse from '../dto/APIResponse';

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
}
