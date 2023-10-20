import { UserModel } from "./models/users.model.js";

class UsersMongo {
  constructor() {}

  getAllUsers = async () => {
    const users = await UserModel.find();
    return users;
  };

  createUser = async (firstName, lastName, email, cart) => {
    this.validatePostUser(firstName, lastName, email);

    const userCreated = await UserModel.create({
      firstName,
      lastName,
      email,
      cart,
    });

    return userCreated;
  };

  updateUser = async (id, firstName, lastName, email, cart) => {
    this.validatePostUser(id, firstName, lastName, email);
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email, cart }
    );
    return userUptaded;
  };

  updateDateUser = async (id, loginDate) => {
    const userUptaded = await UserModel.updateOne({ _id: id }, { loginDate });
    return userUptaded;
  };

  deleteInactiveUser = async (date) => {
    const filtro = { loginDate: { $eq: date } };
    const userDeleted = await UserModel.deleteMany({
      loginDate: { $eq: date },
    });
    return userDeleted;
  };

  deleteUser = async (id) => {
    //this.validateId(id);
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted;
  };
}

export const UserMongo = new UsersMongo();
