import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';
import carsRoute from './routes/cars.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use('/api/cars', carsRoute);


// app.use((err, req, res, next) =>{
//     console.log(err);
//     res.status(500);
//     res.send("Something went wrong")
// })

app.get('/', (req, res) =>{
    res.render('home.ejs')
})

app.get('/cars', (req, res) =>{
    res.render('cars.ejs')
})

app.post('/submit', (req, res) => {
  console.log("REQ.BODY:", req.body);

  const newCar = {
    id: Number(req.body.id),
    make: req.body["car-make"],
    model: req.body["car-model"],
    year: Number(req.body["car-year"]),
    price: Number(req.body["car-price"]),
    dealerId: Number(req.body["car-dealer-id"])
  };

  cars.push(newCar);
  console.log(cars)
  res.send("Success");
});

app.listen(port, () =>{
    console.log('Server is running on port:', port)
})