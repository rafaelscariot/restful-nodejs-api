import { Request, Response } from 'express';
import ProductService from './product.service';

export default class ProductController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const service = new ProductService();
    return res.json(await service.getAll());
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const service = new ProductService();
    const { id } = req.params;
    return res.json(await service.getById({ id }));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = new ProductService();
    const { name, price, quantity } = req.body;
    return res.json(await service.create({ name, price, quantity }));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const service = new ProductService();
    const { name, price, quantity } = req.body;
    const { id } = req.params;
    return res.json(await service.update({ id, name, price, quantity }));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const service = new ProductService();
    const { id } = req.params;
    await service.deleteById({ id });
    return res.json([]);
  }
}
