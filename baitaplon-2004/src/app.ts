
import 'dotenv/config'
import { Route } from '@core/interfaces/index';
import express from 'express';
import mongoose from 'mongoose';
// import { MongoClient, ServerApiVersion } from 'mongodb';
import hpp from 'hpp';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Logger } from '@core/utils';
import { errorMiddelware } from '@core/middleware';
import { createServer, Server } from 'http';
import WebSocket from 'ws';
import{ Server as WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { loggers } from 'winston';
class App {
    public app: express.Application;
    public port: string | number;
    public production: boolean;
    public server: Server;
    public wss: WebSocketServer;
    private clients: { [clientId: string]: WebSocket };
    constructor(routes: Route[]) {
        this.app = express();
        this.clients = {};
        this.port = process.env.PORT || 2206;
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
        this.production = process.env.NODE_ENV === 'production' ? true : false;

        this.connectToDatabase();
        
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorMiddelware();
        this.server = createServer(this.app);
        this.wss = new WebSocketServer({ server: this.server });
        this.initializeWebSocket();
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }

    public listen() {
        this.server.listen(this.port, () => {
            Logger.info('server listening on port: ' + this.port);
        });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        if (this.production) {
            this.app.use(hpp());
            this.app.use(morgan('combined'));
            this.app.use(helmet());
            this.app.use(cors({ origin: 'https://tuedeptrai.edu.vn', credentials: true }));
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(errorMiddelware);
    }

    private initializeErrorMiddelware() {
        this.app.use(errorMiddelware)
    }

    private connectToDatabase() {
        const stringConnect = process.env.MONGODB_URI || 'mongodb+srv://doviettuekk000:tuevietkk123@dvt-cloud-test.zxakrn2.mongodb.net/?retryWrites=true&w=majority&appName=dvt-cloud-test';
        if (!stringConnect) {
            Logger.error('connection failed ');
            return;
        }
        mongoose.connect(stringConnect).then(() => {
            Logger.info('Database connected...');
        }).catch((error: any) => {
            Logger.error('Error connecting: ' + error);
        });
    }
    private initializeWebSocket() {
        this.wss.on('connection', (ws) => {
            Logger.info('Client connected');
            
            ws.on('message', (message) => {
              Logger.info('Nhan ' + typeof(message));
            
              // Phát lại tin nhắn tới tất cả các client
              this.wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                  client.send(message);
                }
              });
            });
          
            ws.on('close', () => {
              Logger.info('Client disconnected');
            });
          });
    }
}

export default App;