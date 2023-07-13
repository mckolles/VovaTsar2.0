const express = require('express');
<<<<<<< HEAD
const apiRoutes=require('./routes/routes.js')
const {Sequelize, conectToDb}=require('./sequelize/db.js')
=======
const apiRoutes=require('./routes.js')
const {Sequelize, conectToDb}=require('./db.js')
>>>>>>> f7942eb4a472872415813741607a2b1352ad6e47
const cors = require('cors');



const app = express();
app.use(cors())
app.use('/', apiRoutes);

const PORT=process.env.PORT||4000

app.listen(PORT, async () => {  
  console.log('Server is running on port 4000')
  await conectToDb( )
});
