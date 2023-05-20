import express, { Request, Response } from 'express';

import Logging from './library/Logging';
import { config } from './config/config';
import http from 'http';
import mongoose from 'mongoose';
import personRoutes from './routes/Person';
import roleGroups from './routes/Group';
import roleRoutes from './routes/Role';
import rotationEventRoutes from './routes/RotationEvent';
import rotationItemRoutes from './routes/RotationItem';

const router = express();

console.log('hi');

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected');
        startServer();
    })
    .catch((error) => {
        Logging.info(error);
    });

const startServer = () => {
    router.use((req, res, next) => {
        Logging.info(
            `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );

        res.on('finish', () => {
            Logging.info(
                `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
            );
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method == 'OPTIONS') {
            res.header(
                'Access-Control-Allow-Methods',
                'PUT, POST, PATCH, DELETE, GET'
            );
            return res.status(200).json({});
        }

        next();
    });

    router.use('/rotationItems', rotationItemRoutes);
    router.use('/rotationEvents', rotationEventRoutes);
    router.use('/person', personRoutes);
    router.use('/roles', roleRoutes);
    router.use('/groups', roleGroups);
    router.use('/teams', roleGroups);

    router.get('/ping', (req, res, next) =>
        res.status(200).json({ message: 'pong' })
    );

    router.get('/', (req: Request, res: Response) => {
        return res.status(200).json({
            status: 'pong',
        });
    });

    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    router.listen(config.server.port, () =>
        Logging.info(`Server is running on port ${config.server.port}`)
    );
};
