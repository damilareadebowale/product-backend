module.exports = (app) => {
  const product = require("../controllers/product.controller.js");

  // Add a product
  app.post("/product_table", product.create);

  // Retrieve all product
  app.get("/product_table", product.findAll);

  // Retrieve one product
  app.get("/product_table/:productId", product.findOne);

  // Edit product
  app.put("/product_table/:productId", product.update);

  // Delete product
  app.delete("/product_table/:productId", product.delete);

  // Delete all products
  app.delete("/product_table", product.deleteAll);
};
