import { Router } from 'express';
import ProductController from './product.controller';
import { celebrate, Joi, Segments, errors } from 'celebrate';

const ProductRouter = Router();
const controller = new ProductController();

ProductRouter.get('/', controller.getAll);

ProductRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  controller.getById,
);

ProductRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  controller.create,
);

ProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);

ProductRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.update,
);

export default ProductRouter;
