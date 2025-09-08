import { productService } from "../services/product.js";
import { responseSuccess } from "../common/helpers/reponse.js";

export const productController = {
  filterProducts: async function (req, res, next) {
    try {
      const result = await productService.filterProducts(req.query);
      const response = responseSuccess(result, "Filter products successfully");
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
