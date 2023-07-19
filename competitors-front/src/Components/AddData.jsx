import React, { useRef, useState } from "react";
import styles from '../app.module.css';

const AddData = ({fetchTablesData}) => {
  const fileInputRef = useRef(null);
  const [imagePath, setImagePath] = useState("");
  const [competitorsId, setСompetitorsId] = useState("");
  const [competitorsName, setcompetitorsName] = useState("");
  

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
    setcompetitorsName(event.target.value);
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };


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
        fileInputRef.current.value = ""
        
      })
      .catch((error) => {
        console.error("Ошибка загрузки файла:", error);
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
        setImagePath("");
        setСompetitorsId("");
        setcompetitorsName("");
        fetchTablesData()
      })
      .catch((error) => {
        console.error("Ошибка при добавлении записи в таблицу competitors:", error);
      });
  };

  
  const addRecordToDatabase = () => {
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
        addCompetitor();
      })
      .catch((error) => {
        console.error("Ошибка при добавлении записи в таблицу competitors_files:", error);
      });
  };

  return (
    <div className={styles.form_row}>
      <input
        type="file"
        className={styles.file_input}
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <button className={styles.btn_upload} onClick={handleUploadButtonClick}>
        Загрузить изображение
      </button>
      <input
        type="text"
        className={styles.competitors_id}
        placeholder="Введите ID конкурента"
        value={competitorsId}
        onChange={handleCompetitorsIdChange}
      />
      <input
        type="text"
        className={styles.input_name}
        placeholder="Имя"
        value={competitorsName}
        onChange={handleCompetitorsNameChange}
      />
      <button onClick={addRecordToDatabase} className={styles.btnAddData}>Добавить запись</button>

      
      
    </div>
  );
};


export default AddData;