// Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
// Id (autogenerado por mongo)
// code: String debe autogenerarse y ser único
// purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
// amount: Number, total de la compra.
// purchaser: String, contendrá el correo del usuario asociado al carrito.

//@ts-check
import { Schema, model } from "mongoose";

const schema = new Schema({
  id: {
    type: String,
    max: 100,
  },
  code: {
    type: String,
    unique: true,
  },
  purchase_datatime: {
    type: String,
  },
  amount: {
    type: String,
    required: true,
  },

  purchaser: {
    type: String,
  },
});

export const TicketModel = model("ticket", schema);
