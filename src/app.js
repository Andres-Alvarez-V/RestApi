import express from 'express'
import morgan from "morgan";
import pkg from "../package.json";
import cors from "cors"

import productsRoutes from './routes/products.routes'
import adminRoutes from './routes/admin.routes'
import funcionalRoutes from './routes/functional.routes'
const app = express()


app.set('pkg', pkg);

app.use(cors())
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
app.use('/api/f', funcionalRoutes)






export default app;