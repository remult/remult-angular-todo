import * as express from 'express';
import * as expressJwt from 'express-jwt';
import { getJwtTokenSignKey } from '../app/auth.service';
import { initExpress } from 'remult/server';

let app = express();
app.use(expressJwt({
    secret: getJwtTokenSignKey(),
    credentialsRequired: false,
    algorithms: ['HS256']
}));
initExpress(app);
app.listen(3002, () => console.log("Server started"));