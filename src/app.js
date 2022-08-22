import express from 'express'
import morgan from "morgan";
import pkg from "../package.json";

import productsRoutes from './routes/products.routes'
import adminRoutes from './routes/admin.routes'
const app = express()


app.set('pkg', pkg);

app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({
        name : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description,
        version : app.get('pkg').version,
    })  
})


app.use('/api/products', productsRoutes)
app.use('/api/admin', adminRoutes)






export default app;