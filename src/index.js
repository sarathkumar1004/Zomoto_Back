const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");

// mongoDB url//
/* const mongoString = "mongodb://localhost:27017/Sarathkumar"; */
// const mongoString = "mongodb://127.0.0.1:27017/prem"

mongoose.set('strictQuery', false);
const corsOpts = {
  origin: '*',
  //domain : * means for all

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};



// router files
const locationRouter = require('./routes/location');
const restaurentRouter = require('./routes/restaurents');
const mealtypeRouter = require('./routes/mealtypes');


// mongoose.connect(mongoString, { useNewUrlParser: true });
// const database = mongoose.connection;

// database.on('error', (error) => {
//   console.log(error)
// })

// database.once('connected', () => {
//   console.log('Database Connected');
// })

const dbUrl = 
"mongodb+srv://Sarathkumar_10_04:S2SiB9OerBfvESBn@Zomoto.6puu1kx.mongodb.net/Sarathkumar?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose
.connect(dbUrl, connectionParams)
.then(()=> {
  console.log("Database Connected");
})
.catch((e)=> {
  console.log("Error:",e);
})

const app = express();

app.use(express.json());

app.use(cors(corsOpts));

app.use('/api/location', locationRouter)
app.use('/api/restaurent', restaurentRouter)
app.use('/api/mealtype', mealtypeRouter)


app.use((req, res, next) => {
  res.status(404).send({ "status": 404, "message": "API URL Not Found", "error": true });
});

app.listen(3002, () => {
  console.log(`Server Started at ${3002}`)
})