import { cartsService } from "../services/carts.service.js";
import { userService } from "../services/users.service.js";

class UsersController {
  getAllUsers = async (req, res) => {
    //const jugadoresEncontrados = jugadoresService.getAllUsers();

    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        data: users,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  };

  /*   const cartCreated = cartsController.Create();
      
        const cart = cartCreated._id;
      
        console.log("Hello" + cartCreated);
      
        */

  createUser = async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;

      const userCreated = await userService.createUser(
        firstName,
        lastName,
        email,
        cart
      );

      return res.status(201).json({
        status: "success",
        msg: "user created",
        data: userCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;

      const userUptaded = await userService.updateUser(
        id,
        firstName,
        lastName,
        email,
        cart
      );
      return res.status(201).json({
        status: "success",
        msg: "user uptaded",
        data: userUptaded,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  /* updateDateUser = async (req, res) => {
    try {
      //const { id } = req.params;

      const userUptaded = await userService.updateDateUser(
        id,
        dateLogin
        //   cart
      );
      return res.status(201).json({
        status: "success",
        msg: "user uptaded",
        data: userUptaded,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };*/

  deleteInactiveUser = async (req, res) => {
    try {
      // const { id } = req.params;id
      const deleted = await userService.deleteInactiveUser();
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        data: { deleted },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      id;
      const deleted = await userService.deleteUser();
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        data: { deleted },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };
}

export const usersController = new UsersController();
