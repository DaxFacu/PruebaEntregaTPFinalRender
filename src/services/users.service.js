import { UserMongo } from "../DAO/mongo/users.mongo.js";

class UserService {
  // validatePostUser(firstName, lastName, email) {
  //   if (!firstName || !lastName || !email) {
  //     console.log(
  //       "validation error: please complete firstName, lastname and email."
  //     );
  //     throw "VALDIATION ERROR";
  //   }
  // }

  // validatePutUser(id, firstName, lastName, email) {
  //   if ((!id, !firstName || !lastName || !email)) {
  //     console.log(
  //       "validation error: please complete firstName, lastname and email."
  //     );
  //     throw "VALDIATION ERROR";
  //   }
  // }

  // validateId(id) {
  //   if (!id) {
  //     console.log(
  //       "validation error: please complete firstName, lastname and email."
  //     );
  //     throw "VALDIATION ERROR";
  //   }
  // }
  async getAllUsers() {
    const users = await UserMongo.getAllUsers();
    return users;
  }

  async createUser(firstName, lastName, email, cart) {
    this.validatePostUser(firstName, lastName, email);

    const userCreated = await UserModel.createUser({
      firstName,
      lastName,
      email,
      cart,
    });
    return userCreated;
  }
  async updateUser(id, firstName, lastName, email, cart) {
    this.validatePostUser(id, firstName, lastName, email);

    const userUptaded = await UserMongo.updateUser(
      { _id: id },
      { firstName, lastName, email, cart }
    );
    return userUptaded;
  }

  async updateDateLoginUser(id, date) {
    const userUptaded = await UserMongo.updateDateUser(id, date);
    return userUptaded;
  }

  async deleteUser(id) {
    // this.validateId(id);

    const deleted = await UserMongo.deleteUser({ _id: id });
    return deleted;
  }

  async deleteInactiveUser() {
    const date = new Date().getDate().toString().padStart(2, "0");

    const users = await UserMongo.getAllUsers();

    //const usersFilter = users.filter((user) => user.loginDate != 21);
    console.log(users[0].loginDate);

    // for (let i = 0; i < usersFilter.length; i++) {
    const deleted = await UserMongo.deleteInactiveUser(
      date
      // {
      // _id: usersFilter[i]._id,
      //  }
    );
    console.log("usuario eliminado");
    //console.log(usersFilter[i]._id);
    return deleted;
    //}
  }
}

export const userService = new UserService();
