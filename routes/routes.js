const express= require('express')
const Competitor=require('../sequelize/models/competitor')
const CompetitorFiles=require('../sequelize/models/competitorFiles')
const upload=require('../middleware/upload')
const path=require('path')
const { sequelize } = require('../sequelize/db')


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
  
    res.status(200).json({ message: 'File uploaded successfully',uploadedFileName: req.uploadedFileName  });
  });

  router.post('/add-competitor', async (req, res) => {
      const { competitorsName } =  await req.body;
      const competitor = await Competitor.create({
        name: competitorsName,
        created_at: new Date(),
      });
      await sequelize.query('SET @count = 0');
      await sequelize.query('UPDATE competitors SET id = @count:=@count+1');
     
      console.log('Запись успешно добавлена');
      return res.status(200).json({ message: 'Запись успешно добавлена' });
    }  
  );
  
  
  router.post('/add-competitors-file', async (req, res) => {
    const { imagePath, competitorsId } = req.body;
    try {
      const competitorFile = await CompetitorFiles.create({
        image: imagePath,
        competitors_id: competitorsId, 
        created_at: new Date()
      });
      await sequelize.query('SET @count = 0');
      await sequelize.query('UPDATE competitors_files SET id = @count:=@count+1');
      return res.status(200).json({ message: 'Запись успешно добавлена' });
    } catch (error) {
      console.error('Ошибка при добавлении файла конкурента:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

router.put('/update-competitor/:id',async(req,res)=>{
  const {id} = req.params;
  const { competitorsName } = req.body
  try {
    const [rowsAffected] = await Competitor.update(
      {
        name: competitorsName, 
        updated_at: new Date()
      },
      { where: {id} }
    );

    if (rowsAffected > 0) {
      console.log(`Competitor with ID ${id} updated successfully.`);
      return res.status(200).json({ message: 'Competitor updated successfully.' });
    } else {
      return res.status(404).json({ error: `Competitor with ID ${id} not found.` });
    }
  } catch (error) {
    console.error('Error while updating competitor:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
})

router.put('/update-competitor-files/:id',async(req,res)=>{
  const {id} = req.params;
  const { imagePath, competitorsId } = await req.body;

  try {
    const competitorFile = await CompetitorFiles.update(
      {
        image: imagePath,
        competitors_id: competitorsId,
        updated_at: new Date(),
      },
      { where: { id } }
    );
    
    res.status(200).json(competitorFile);
  } catch (error) {
    console.error('Ошибка при обновлении файла конкурента:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.put('/update-all/:id',async(req,res)=>{
  const {id} = req.params;
  const { imagePath, competitorsId,competitorsName} = await req.body;
  try {
    const competitorFile = await CompetitorFiles.update(
      {
        image: imagePath,
        competitors_id: competitorsId,
        updated_at: new Date(),
      },
      { where: { id } }
      
    );
    res.status(200).json(competitorFile);
  }
  catch (error) {
    console.error('Ошибка при обновлении общей таблицы (CompetitorFiles) :', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
  try {
    const competitor = await Competitor.update(
      {
        name: competitorsName, 
        updated_at: new Date()
      },
      { where: {id:competitorsId} }
    )
    }
  catch (error) {
    console.error('Ошибка при обновлении общей таблицы(Competitor) :', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
})

router.delete('/delete-comptitor/:id',async(req,res)=>{
  const {id} = req.params;
  try{
    await Competitor.destroy(
      {where:{id}}
    )
    await sequelize.query('SET @count = 0');
    await sequelize.query('UPDATE competitors SET id = @count:=@count+1');
    await sequelize.query('SET @count = 0');
    await sequelize.query('UPDATE competitors_files SET id = @count:=@count+1');

    
    res.status(200).json('Успешно')
  }
  catch (error) {
    console.error('Ошибка при удалении(Competitor) :', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
})

router.delete('/delete-comptitor-files/:id',async(req,res)=>{
  const {id} = req.params;
  try{
    await CompetitorFiles.destroy(
      {where:{id}}
    )
    await sequelize.query('SET @count = 0');
    await sequelize.query('UPDATE competitors_files SET id = @count:=@count+1');
    await sequelize.query('SET @count = 0');
    await sequelize.query('UPDATE competitors SET id = @count:=@count+1');
    res.status(200).json('Успешно')
  }
  catch (error) {
    console.error('Ошибка при удалении(CompetitorFiles) :', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
})

module.exports=router