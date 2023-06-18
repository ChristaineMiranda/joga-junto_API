import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index.js';
import errorhandlingMiddleware from './middlewares/errorHandlingMiddleware.js';

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);
server.use(errorhandlingMiddleware);

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log("Server is running")
});