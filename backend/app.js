require('dotenv').config();
const cors = require('cors');
const { json } = require('express');
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const client = new MongoClient(process.env['CONNECTION_STRING']);
let collection;
// -> middlewares

app.use(express.json());
app.use(cors());


app.get('/search', async (req, res) => {
    const { key_word } = req.body;
    const agg = [
        { $search: { autocomplete: { query: key_word, path: "title" } } },
        { $limit: 20 },
        { $project: { _id: 0, title: 1 } }
    ];
    // -> RUN pipeline
    const result = await collection.aggregate(agg);
    // -> print results
    let results=[];
    await result.forEach((resultOne=>{
        results = [...results, resultOne];
    }))
    res.status(200).json(results)
})


app.listen(
    process.env['PORT'],
    async () => {
        try {
            await client.connect();
            collection = client.db('sample_mflix').collection('movies')
        }
        catch (error) {
            console.log()
        }
    }
);




