import express from 'express';
import authRouter from './routes/auth.js';
import sweetsRouter from './routes/sweets.js';
import connectDB from './config/db.js';
import cors from 'cors'

connectDB();

const app = express();
const PORT = 8080;

app.use(express.json()); 

const allowedOrigins = [
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Sweet Shop API is running!');
});

app.use('/api/auth', authRouter); 
app.use('/api/sweets', sweetsRouter);


//global error handler --> telling express when next(err) is called
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app; //for testing we need to export the app in index.js #leaning!!