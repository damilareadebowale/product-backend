const sql = require("./db.js");

// Constructor
const Product = function (product) {
  this.product_name = product.product_name;
  this.product_price = product.product_price;
  this.product_quantity = product.product_quantity;
};

// Insert
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product_table SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("product added: ", { id: res.name, ...newProduct });
    result(null, { id: res.name, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(
    `SELECT * FROM product_table WHERE product_id =  ${productId}`,
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found product: ", res[0]);
        result(null, res[0]);
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Product.getAll = (result) => {
  sql.query(`SELECT * FROM product_table`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (productId, product, result) => {
  sql.query(
    `UPDATE product_table SET product_name=?, product_price=?, product_quantity=? WHERE product_id=? `,
    [
      product.product_name,
      product.product_price,
      product.product_quantity,
      productId,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated Product: ");
      result(null, { product_id: productId, ...product });
    }
  );
};

Product.remove = (productId, result) => {
  sql.query(
    `DELETE FROM product_table WHERE product_id = ${productId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted Product: ");
      result(null, res);
    }
  );
};

Product.removeAll = (result) => {
  sql.query(`DELETE FROM product_table`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("All products deleted from the database: ");
    result(null, res);
  });
};
module.exports = Product;
