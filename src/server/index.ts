import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { initExpress } from 'remult/server';

let app = express();
let api = initExpress(app);
app.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(api.openApiDoc({ title: 'remult-angular-todo' })));
app.listen(3002, () => console.log("Server started"));