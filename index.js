
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

import fs from 'fs'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = "mongodb://maxwell:max123456789@docdb-2022-05-21-19-19-30.cjusoor1boi4.us-east-2.docdb.amazonaws.com:27017/test?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
const PORT = process.env.PORT|| 5000;

//const client = new MongoClient(CONNECTION_URL, options);
//const client = await MongoClient.connect();

mongoose.connect(CONNECTION_URL, {  useNewUrlParser: true, 
	useFindAndModify: false,
        sslCA: [fs.readFileSync("rds-combined-ca-bundle.pem")]})
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
	.catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);
