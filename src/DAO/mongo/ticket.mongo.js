import { TicketModel } from "./models/ticket.model.js";

class TicketMongo {
  constructor() {}

  getTicket = async () => {
    const users = await TicketModel.find({});
    return users;
  };

  createTicket = async (code, purchase_datatime, amount, purchaser) => {
    const ticketCreated = await TicketModel.create({
      code,
      purchase_datatime,
      amount,
      purchaser,
    });

    return ticketCreated;
  };
}

export const ticketMongo = new TicketMongo();
