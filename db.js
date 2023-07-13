const {Sequelize}=require('sequelize')

const sequelize = new Sequelize('competitors', 'root', 'Koleso98', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
const conectToDb=async ()=>{
    try{
        await sequelize.authenticate()
        console.log('Successfulu conected to DB')
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports={sequelize, conectToDb}