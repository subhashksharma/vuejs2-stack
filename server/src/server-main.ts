import express from 'express';
import cors from 'cors';
import * as http from 'http';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';


//Custom import
import { RouteController } from './route-controller';

export class ServerMain {
  public static readonly PORT: number = 3000;
  private app?: express.Application;
  private server?: http.Server;
  private port?: string | number;

  constructor() {
    this.createApp();
    this.createServer();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(cors());
    this.app?.set('trust proxy', true);
    this.app?.use(json());
    this.app?.use(
      cookieSession({
        signed: false,
        secure: false, //process.env.NODE_ENV !== "test",
      })
    );
    const route = new RouteController(this.app);
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }
  private listen(): void
  {
    this.server?.listen(3000, () =>
    {
      console.log('Running server on port %s', 3000);
    });
  }
  public getApp(): express.Application {
    return this.app!;
  }
}
