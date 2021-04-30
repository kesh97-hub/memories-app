import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

//https://www.mongodb.com/cloud/atlas
app.get('/', (req, res) => {
    res.send('Hello to Memories API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
        })
        .catch((error) => {
            console.log(error);
        });

mongoose.set('useFindAndModify', false);