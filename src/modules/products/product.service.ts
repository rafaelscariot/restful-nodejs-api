import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import {
  ICreateRequest,
  IGetByIdRequest,
  IUpdateRequest,
} from '@interfaces/products.interface';
import Product from './typeorm/entities/Product';
import { ProductRepository } from './typeorm/repositories/products.repository';

class ProductService {
  public async create({
    name,
    price,
    quantity,
  }: ICreateRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists)
      throw new AppError(`There is already a product with name ${name}`);

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }

  public async getAll(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    return productRepository.find();
  }

  public async getById({ id }: IGetByIdRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) throw new AppError(`Product with id ${id} was not found`);

    return product;
  }

  public async update({
    id,
    name,
    price,
    quantity,
  }: IUpdateRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) throw new AppError(`Product with id ${id} was not found`);

    const productExists = await productRepository.findByName(name);

    if (productExists && name !== product.name)
      throw new AppError(`There is already a product with name ${name}`);

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }

  public async deleteById({ id }: IGetByIdRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) throw new AppError(`Product with id ${id} was not found`);

    await productRepository.remove(product);
  }
}

export default ProductService;
