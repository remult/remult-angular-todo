import * as express from 'express';
import * as expressJwt from 'express-jwt';
import { getJwtTokenSignKey } from '../app/auth.service';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { initExpress } from 'remult/server';

let app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(expressJwt({
    secret: getJwtTokenSignKey(),
    credentialsRequired: false,
    algorithms: ['HS256']
}));
initExpress(app);
app.use(express.static('dist/remult-angular-todo'));
app.use('/*', async (req, res) => {
   res.sendFile('./dist/remult-angular-todo/index.html');
});
app.listen(process.env.PORT || 3002, () => console.log("Server started"));