import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';
import carsRoute from './routes/cars.js';
import carsData from './data/cars.js'
import dealersData from './data/dealers.js';
import dealersRoute from './routes/dealers.js'
import reviewsRoute from './routes/reviews.js'

const app = express();
const port = 3000;

app.set('view engine', 'ejs')

function validateCar(req, res, next) {
  const make = req.body["car-make"];
  const model = req.body["car-model"];

  if (!make || !model) {
    return res.status(400).send("Missing data");
  }

  next();
}

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api/cars', carsRoute);
app.use('/api/dealers', dealersRoute);
app.use('/api/reviews', reviewsRoute );


app.get('/', (req, res) =>{
    res.render('home.ejs')
})

app.get('/cars', (req, res) =>{
    res.render("cars.ejs", { cars: carsData });
})

app.post('/submit', validateCar, (req, res) => {
  console.log("REQ.BODY:", req.body);

  const newCar = {
    id: Number(req.body.id),
    make: req.body["car-make"],
    model: req.body["car-model"],
    year: Number(req.body["car-year"]),
    price: Number(req.body["car-price"]),
    dealerId: Number(req.body["car-dealer-id"])
  };

  carsData.push(newCar);
  console.log(carsData)
 res.render("cars.ejs", {
    cars: carsData
  });
});


app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500);
    res.send("Something went wrong")
})

app.listen(port, () =>{
    console.log('Server is running on port:', port)
})

