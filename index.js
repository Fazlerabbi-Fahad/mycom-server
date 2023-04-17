const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

//connect mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1bviphv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const productsCollection = client.db('MyCommerce').collection('Products');

    try {
        //get products
        app.get('/products', async (req, res) => {
            const query = {};
            const results = await productsCollection.find(query).toArray();
            res.send(results);
        })

    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send(`MyCommerce server is running`)
})

app.listen(port, () => {
    console.log(`MyCommerce is running on ${port}`);
})