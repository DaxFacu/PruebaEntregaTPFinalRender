import { connect } from "mongoose";
import { entorno } from "../config/config.js";

export async function connectMongo() {
  try {
    await connect(
      //"mongodb+srv://facundolasta:Mn1EJoLYsEyEsZPg@back-test.otvhkve.mongodb.net/?retryWrites=true&w=majority"
      entorno.MONGO_URL
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
