const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleWare 
app.use(express.json())

app.use(cors())

// app.use(cors({
//   origin: ['http://localhost:5173']
//   }));

// const corsConfig = {
//   origin: ["https://assignment-10-7362a.web.app/"],
//   credentials: true,
// };


// backend 



const uri = `mongodb+srv://${process.env.User_ID}:${process.env.User_pass}@juyel.zm7wayi.mongodb.net/?retryWrites=true&w=majority&appName=JUYEL`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    // await client.connect();










    async function getUsersFromAPI() {
      try {
        const response = await fetch('https://southeast-asia-server-three.vercel.app/addTourist');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching users from API:', error);
        return [];
      }
    }
    
    
    app.get('/users', async (req, res) => {
      try {
        const users = await getUsersFromAPI();
        
        if (req.query.email) {
          const filteredUsers = users.filter(user => user.email === req.query.email);
          if (filteredUsers.length > 0) {
            res.json(filteredUsers);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } else {
          res.json(users);
        }
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    




    




    const touristCollection = client.db('TouristDB').collection('Tourist');
    const CountriesTouristCollection = client.db('TouristDB').collection('Countries');
    const BangladeshTouristCollection = client.db('TouristDB').collection('Bangladesh');
    const ThailandTouristCollection = client.db('TouristDB').collection('Thailand');
    const IndonesiaTouristCollection = client.db('TouristDB').collection('Indonesia');
    const MalaysiaTouristCollection = client.db('TouristDB').collection('Malaysia');
    const VietnamTouristCollection = client.db('TouristDB').collection('Vietnam');
    const CambodiaTouristCollection = client.db('TouristDB').collection('Cambodia');


          // mongodb data get 

          // Countries 
          app.get('/Countries', async(req, res)=>{
            const cursor = CountriesTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })
          // Bangladesh 
          app.get('/Bangladesh', async(req, res)=>{
            const cursor = BangladeshTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })
          // Thailand 
          app.get('/Thailand', async(req, res)=>{
            const cursor = ThailandTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })
          // Indonesia 
          app.get('/Indonesia', async(req, res)=>{
            const cursor = IndonesiaTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })
          // Malaysia 
          app.get('/Malaysia', async(req, res)=>{
            const cursor = MalaysiaTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })
          // Vietnam 
          app.get('/Vietnam', async(req, res)=>{
            const cursor = VietnamTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })
          // Cambodia 
          app.get('/Cambodia', async(req, res)=>{
            const cursor = CambodiaTouristCollection.find();
            const tourist = await cursor.toArray();
            res.send(tourist)
          })









    // tourist post
    app.post('/addTourist', async(req, res)=>{
        const tourist = req.body;
        console.log(tourist);
        const result = await touristCollection.insertOne(tourist);
        res.send(result)

    })

  
    // tourist get 
    app.get('/addTourist', async(req, res)=>{
        const cursor = touristCollection.find();
        const tourist = await cursor.toArray();
        res.send(tourist)
    
      })

      // delete operations 
      app.delete('/addTourist/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await touristCollection.deleteOne(query);
        res.send(result)

      })

      // get all countries data 

      app.get('/Thailand/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await ThailandTouristCollection.findOne(query);
        res.send(result)
      })
      app.get('/Bangladesh/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await BangladeshTouristCollection.findOne(query);
        res.send(result)
      })
      app.get('/Indonesia/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await IndonesiaTouristCollection.findOne(query);
        res.send(result)
      })
      app.get('/Malaysia/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await MalaysiaTouristCollection.findOne(query);
        res.send(result)
      })
      app.get('/Countries/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await CountriesTouristCollection.findOne(query);
        res.send(result)
      })
      app.get('/Vietnam/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await VietnamTouristCollection.findOne(query);
        res.send(result)
      })
      app.get('/Cambodia/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await CambodiaTouristCollection.findOne(query);
        res.send(result)
      })




      // update operation 


      app.get('/addTourist/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await touristCollection.findOne(query);
        res.send(result)
      })

      app.put('/addTourist/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const options = {upsert: true};
        const updateTourist = req.body;
        const tourist = {
          $set: {
            cost: updateTourist.cost,
            seasonality: updateTourist.seasonality,
            image: updateTourist.image,
            time: updateTourist.time,
            visitors: updateTourist.visitors,
            CountryName: updateTourist.CountryName,
            spotName: updateTourist.spotName,
            location: updateTourist.location,
            description: updateTourist.description
          }
        }
        const result = await touristCollection.updateOne(filter, tourist, options)
        res.send(result)


      })


   






    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Southeast asia server is running');
})

app.listen(port, ()=>{
    console.log(`Southeast asia server is running on port:${port}`)
})