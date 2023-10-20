//@ts-check
import { Schema, model } from "mongoose";
import monsoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  id: { type: Number, required: false },
});

schema.plugin(monsoosePaginate);
export const ProductModel = model("products", schema);
