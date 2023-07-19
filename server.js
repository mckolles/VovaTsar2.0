const express = require('express');
const apiRoutes=require('./routes/routes.js')
const {Sequelize, conectToDb}=require('./sequelize/db.js')
const cors = require('cors');



const app = express();
app.use(cors())
app.use('/', apiRoutes);


const PORT=process.env.PORT||4000

app.listen(PORT, async () => {  
  console.log('Server is running on port 4000')
  await conectToDb( )
});
