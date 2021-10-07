import * as express from 'express';
import * as expressJwt from 'express-jwt';
import { getJwtTokenSignKey } from '../app/auth.service';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { Remult, SqlDatabase } from 'remult';
import { PostgresDataProvider, verifyStructureOfAllEntities } from 'remult/postgres';
import { Pool } from 'pg';
import { initExpress } from 'remult/server';

let app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(expressJwt({
    secret: getJwtTokenSignKey(),
    credentialsRequired: false,
    algorithms: ['HS256']
}));
let getDatabase = () => {
    if (process.env.NODE_ENV === "production") {
        const db = new SqlDatabase(new PostgresDataProvider(new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV !== "production" ? false : {
                rejectUnauthorized: false
            }
        })));
        let remult = new Remult();
        remult.setDataProvider(db);
        verifyStructureOfAllEntities(db, remult);
        return db;
    }
    return undefined;
}
initExpress(app, {
    dataProvider: getDatabase()
});
app.use(express.static('dist/remult-angular-todo'));
app.use('/*', async (req, res) => {
   res.sendFile('./dist/remult-angular-todo/index.html');
});
app.listen(process.env.PORT || 3002, () => console.log("Server started"));