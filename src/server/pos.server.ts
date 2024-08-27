
import * as socketIo from "socket.io";
import WindowsManager from "../windows.manager";
import { version } from '../../package.json';
import PosHandler from "./pos.handler";
import pos from "../pos";

const PORT = 8090;
const cors = {
  origin: 'http://pos-web.test',
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

const io = new socketIo.Server(PORT, {cors, allowEIO3: true});
const posHandler = new PosHandler(io, pos);

export default class PosServer {
  start(): void {
    let clientsCount = 0;

    function updateClientCount(count) {
      clientsCount = count;
      const windowsManager = WindowsManager.getMainWindow();
      if (windowsManager) {
        windowsManager.webContents.send("count", count);
      }
    }

    io.on("connection", (socket) => {
      updateClientCount(clientsCount + 1);

      pos.on("port_opened", (port) => {
        io.emit("event.port_opened", port);
      });

      pos.on("port_closed", () => {
        io.emit("event.port_closed");
      });

      socket.on("disconnect", () => {
        updateClientCount(clientsCount - 1);
      });

      socket.on("getVersion", () => {
        io.emit("getVersion.response", version);
      });

      socket.on("openPort", ({ port, baudrate, eventName }) => {
        posHandler.openPort(port, baudrate, eventName);
      });

      socket.on("closePort", ({ eventName }) => {
        posHandler.closePort(eventName);
      });

      socket.on("getPortStatus", ({ eventName }) => {
        posHandler.getPortStatus(eventName);
      });

      socket.on("listPorts", ({ eventName }) => {
        posHandler.listPorts(eventName);
      });

      socket.on("autoconnect", ({ baudrate, eventName }) => {
        posHandler.autoConnect(baudrate, eventName);
      });

      socket.on("poll", ({ eventName }) => {
        posHandler.poll(eventName);
      });

      socket.on("loadKeys", ({ eventName }) => {
        posHandler.loadKeys(eventName);
      });

      socket.on("closeDay", ({ eventName }) => {
        posHandler.closeDay(eventName);
      });

      socket.on("getTotals", ({ eventName }) => {
        posHandler.getTotals(eventName);
      });

      socket.on("getLastSale", ({ eventName }) => {
        posHandler.getLastSale(eventName);
      });

      socket.on("salesDetail", ({ printOnPos, eventName }) => {
        posHandler.salesDetail(printOnPos, eventName);
      });

      socket.on("refund", ({ operationId, eventName }) => {
        posHandler.refund(operationId, eventName);
      });

      socket.on("changeToNormalMode", ({ eventName }) => {
        posHandler.changeToNormalMode(eventName);
      });

      socket.on("sale", ({ amount, ticket, eventName }) => {
        posHandler.sale(amount, ticket, eventName);
      });

      socket.on(
        "multicodeSale",
        ({ amount, ticket, commerceCode = "0", eventName }) => {
          posHandler.multicodeSale(amount, ticket, commerceCode, eventName);
        }
      );
    });
  }
}
