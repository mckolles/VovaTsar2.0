import React, { useRef, useState,useEffect } from "react";
import styles from '../app.module.css';

const AddData = ({fetchTablesData}) => {
  const fileInputRef = useRef(null);
  const [imagePath, setImagePath] = useState("");
  const [competitorsId, setСompetitorsId] = useState("");
  const [competitorsName, setCompetitorsName] = useState("");
  const [stateOfH,setStateOfH]=useState("Общая таблица")
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const competitorsAll=stateOfH==='Общая таблица'
  const competitorsFiles=stateOfH==='Таблица Файлы конкурентов'
  const competitors=stateOfH==='Таблица Конкуренты'


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleCompetitorsIdChange = (event) => {
    setСompetitorsId(event.target.value);
  };
  const handleCompetitorsNameChange = (event) => {
    setCompetitorsName(event.target.value);
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handlesetStateOfH=(stateOfH)=>{
    setStateOfH(stateOfH);
  }


  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Файл успешно загружен:", data);
        setImagePath(`http://localhost:4000/images/${data.uploadedFileName}`);
        setIsFileUploaded(true)
        fileInputRef.current.value = ""
        
      })
      .catch((error) => {
        console.error("Ошибка загрузки файла:", error);
        setIsFileUploaded(false)
      });
  };

  const addCompetitor = () => {
    fetch("http://localhost:4000/add-competitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        competitorsName: competitorsName, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Запись успешно добавлена в таблицу competitors:", data);
        setCompetitorsName("");
        fetchTablesData()
      })
      .catch((error) => {
        console.error("Ошибка при добавлении записи в таблицу competitors:", error);
      });
  };

  
  const addCompetitorFiles = () => {
    fetch("http://localhost:4000/add-competitors-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imagePath: imagePath,
        competitorsId: competitorsId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Запись успешно добавлена в таблицу competitors_files:", data);
        setСompetitorsId("");
        setCompetitorsName("");
        fetchTablesData()
        setIsFileUploaded(false)
      })
      .catch((error) => {
        console.error("Ошибка при добавлении записи в таблицу competitors_files:", error);
      });
  };

  return (
    <>
    <h3>{stateOfH}</h3>
    <div className={styles.form_row}>
    {competitors&&<button onClick={()=>handlesetStateOfH('Общая таблица')} className={styles.btnAddData}>Назад</button>}
    {competitorsFiles&&<button onClick={()=>handlesetStateOfH('Общая таблица')} className={styles.btnAddData}>Назад</button>}
      <input
        type="file"
        className={styles.file_input}
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      {competitorsFiles&&<button className={styles.btn_upload} onClick={handleUploadButtonClick}>
        {isFileUploaded?'Успешно загружено':'Загрузите изображение'}
      </button>}
     {competitorsFiles&& <input
        type="text"
        className={styles.competitors_id}
        placeholder="Введите ID конкурента"
        value={competitorsId}
        onChange={handleCompetitorsIdChange}
      />}
      {competitors&&<input
        type="text"
        className={styles.input_name}
        placeholder="Имя"
        value={competitorsName}
        onChange={handleCompetitorsNameChange}
      />}
    {competitors&&<button onClick={addCompetitor} className={styles.btnAddData}>Добавить запись</button>}
    {competitorsFiles&&<button onClick={addCompetitorFiles} className={styles.btnAddData}>Добавить запись</button>}
    {competitorsAll&&<button onClick={()=>handlesetStateOfH('Таблица Конкуренты')} className={styles.btnAddData}>Добавить имя в таблицу 'Конкуренты'</button>}
    {competitorsAll&&<button onClick={()=>handlesetStateOfH('Таблица Файлы конкурентов')} className={styles.btnAddData}>Добавить изображение в таблицу 'Файлы конкурентов'</button>}

    </div>
    </>
  );
};


export default AddData;