import * as express from 'express';
import { initExpress } from 'remult/server';

let app = express();
initExpress(app);
app.listen(3002, () => console.log("Server started"));