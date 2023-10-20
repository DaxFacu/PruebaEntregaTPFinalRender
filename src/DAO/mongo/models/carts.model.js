//@ts-check
import { Schema, model } from "mongoose";

const schema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number },
      },
    ],
    default: [],
  },
});

schema.pre("findOne", function () {
  this.populate("products.product");
});

schema.pre("find", function () {
  this.populate("products.product");
});

export const CartModel = model("carts", schema);
