import React, { useRef } from "react";
import styles from '../app.module.css';

const AddData = (props) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
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
      })
      .catch((error) => {
        console.error("Ошибка загрузки файла:", error);
      });
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
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
      />
      <input
        type="text"
        className={styles.input_name}
        placeholder="Имя"
      />
      <button className={styles.btnAddData}>Добавить запись</button>
    </div>
  );
};

export default AddData;
