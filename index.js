import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500);
    res.send("Something went wrong")
})

app.listen(port, () =>{
    console.log('Server is running on port:', port)
})