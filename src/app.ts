import "reflect-metadata";

import { Application } from "express";
import { Container } from "typedi";
import { useContainer as ormUseContainer } from "typeorm";
import { createExpressServer, useContainer } from "routing-controllers";
import { createConnection, Connection} from "typeorm";

import * as morgan from "morgan";
import { UserController } from "./controllers/User";

export class App {

    public server: Application;
    public port = process.env.PORT;
    public connection: Connection;

    constructor() {
        useContainer(Container);
        ormUseContainer(Container);

        this.server = createExpressServer({
            defaultErrorHandler: false,
            middlewares: [__dirname + "/middlewares/global/*{.js,.ts}"],
            cors: true,
            controllers: this.controllers()
        });

        this.server.use(morgan("combined"));
    }

    private async createConnection() {
        this.connection = await createConnection();
        console.info("Connected to the DB");
    }

    private controllers() {
        return [
            UserController
        ];
    }

    public listen() {
        this.createConnection();
        return this.server.listen(this.port);
    }

}
