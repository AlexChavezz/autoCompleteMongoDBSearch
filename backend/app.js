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



/*

    LEARN MORE ABOUT ATLASSEARCH HERE https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial
*/

app.get('/search/:key_word', async (req, res) => {
    const { key_word } = req.params;
    if(!key_word) return res.status(400).json({message: 'key_word is required'});
    const agg = [
        { $search: { autocomplete: { query: key_word, path: "title" } } },
        { $limit: 10 },
        { $project: { _id: true, title: true, year: true } }
    ];
    // -> RUN pipeline
    const results = await collection.aggregate(agg).toArray();
    // -> print results
    // let results=[];
    // await result.forEach((resultOne => {
    //     results = [...results, resultOne];
    // }))
    res.status(200).json(results)
})

app.get("*", (req, res) => {
    res.status(404).json({ message: "Not found" })
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




