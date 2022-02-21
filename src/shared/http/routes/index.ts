import ProductRouter from '@modules/products/product.router';
import { Router } from 'express';

const routes = Router();

routes.use('/products', ProductRouter);

export default routes;
