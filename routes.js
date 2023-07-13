const express= require('express')
const Competitor=require('./models/competitor')
const CompetitorFiles=require('./models/competitorFiles')

const router=express.Router()

router.get('/', (req, res) => {
    res.send('Hello, server is running!');
  });

router.get('/competitors',async (req,res)=>{
   const competitors= await Competitor.findAll()
   res.status(200).json(competitors)
  })
router.get('/files',async (req,res)=>{
   const competitorsFiles= await CompetitorFiles.findAll()
   res.status(200).json(competitorsFiles)
  })
  

module.exports=router