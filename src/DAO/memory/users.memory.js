import { UserModel } from "./models/products.model.js";

export default class ProductsMongo {
  constructor() {}

  getAllUsers = async () => {
    const users = await UserModel.find({});
    return users;
  };

  createUser = async (firstName, lastName, email) => {
    this.validatePostUser(firstName, lastName, email);
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return userCreated;
  };

  updateUser = async (id, firstName, lastName, email) => {
    this.validatePostUser(id, firstName, lastName, email);
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  };

  deleteUser = async (id) => {
    this.validateId(id);
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted;
  };
}
