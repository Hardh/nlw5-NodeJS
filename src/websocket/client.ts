import { io } from "../http";
import { Server, Socket } from "socket.io";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface Iparams {
  text: string;
  email: string;
}

io.on("connect", (socket: Socket) => {

  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async (params) => {

    const socket_id = socket.id;
    const { text, email } = params as Iparams;
    let user_id = null;

    const userExistis = await usersService.findByEmail(email);
    if(!userExistis) {
      const user = await usersService.create(email);
      await connectionsService.create({
        socket_id,
        user_id: user.id
      })

      user_id = user.id;
    } else {
      user_id = userExistis.id;
      const connection = await connectionsService.findByUserId(userExistis.id);

      if(!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExistis.id
        })
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }

    await messagesService.create({
      text,
      user_id
    })
  })
})
