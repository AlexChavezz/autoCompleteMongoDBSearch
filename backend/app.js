require('dotenv').config();
const cors = require('cors');
const { json } = require('express');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const client = new MongoClient(process.env['CONNECTION_STRING']);
// -> middlewares

app.use(express.json());
app.use(cors());



/*

    LEARN MORE ABOUT ATLASSEARCH HERE https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial
*/

app.get('/search/get/:_id', async (req, res) => {
    const { _id } = req.params;
    console.log(_id)
    try
    {
        const movie = await client.db('sample_mflix').collection('movies').findOne({_id: {$eq: ObjectId(_id)}});
        res.json(movie);    
    }catch(error)
    {
        console.log(`ERROR ${error}`);
    }
});

app.get('/search/:key_word', async (req, res) => {
    const { key_word } = req.params;
    if(!key_word) return res.status(400).json({message: 'key_word is required'});
    const collection = client.db('sample_mflix').collection('movies');
    const agg = [
        { $search: { autocomplete: { query: key_word, path: "title" } } },
        { $limit: 10 },
        { $project: { _id: true, title: true } }
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
        }
        catch (error) {
            console.log()
        }
    }
);




