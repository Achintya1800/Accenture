const express = require('express');
const aiRoute = require('./routes/route.js');
// import aiRoute from './routes/route.js'; 
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use('/api/ai', aiRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});