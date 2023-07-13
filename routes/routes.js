const express= require('express')
const Competitor=require('../sequelize/models/competitor')
const CompetitorFiles=require('../sequelize/models/competitorFiles')
const upload=require('../middleware/upload')
const path=require('path')


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

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    res.status(200).json({ message: 'File uploaded successfully' });
  });

router.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads', filename);
    res.sendFile(imagePath);
  });


module.exports=router