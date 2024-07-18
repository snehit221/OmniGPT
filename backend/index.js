const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

const subscriptionRoutes = require('./routes/subscriptionRoutes');

const bodyParser=require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(subscriptionRoutes)

app.use(bodyParser.json())

app.listen(port, () => {
    console.log("Server running on port", port);
});
