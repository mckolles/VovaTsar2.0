const express= require('express')
const Competitor=require('../sequelize/models/competitor')
const CompetitorFiles=require('../sequelize/models/competitorFiles')
const upload=require('../middleware/upload')
const path=require('path')



const router=express.Router()
router.use(express.json());

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

router.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads', filename);
    res.sendFile(imagePath);
  });



router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    res.status(200).json({ message: 'File uploaded successfully' });
  });

  router.post('/add-competitor', async (req, res) => {
      const { competitorsName } =  await req.body;
      const competitor = await Competitor.create({
        name: competitorsName,
        created_at: new Date(),
      });
      // Запись успешно добавлена
      console.log('Запись успешно добавлена');
      return res.status(200).json({ message: 'Запись успешно добавлена' });
    }  
  );
  
  
  router.post('/add-competitors-file', async (req, res) => {
    const { imagePath, competitorsId } = req.body;
    try {
      // Создание новой записи в таблице competitors_files
      const competitorFile = await CompetitorFiles.create({
        image: imagePath, // Замените на imagePath
        competitors_id: competitorsId, // Замените на competitorsId
        created_at: new Date()
      });
  
      res.status(200).json(competitorFile);
    } catch (error) {
      console.error('Ошибка при добавлении файла конкурента:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  

module.exports=router