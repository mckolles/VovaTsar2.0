import React from "react";
import styles from '../app.module.css';
import CompetitorTable from "./CompetitorTable";

const AddData = ({
  fetchTablesData,
  stateOfH,
  handlesetStateOfH,
  fileInputRef,
  handleFileSelect,
  handleUploadButtonClick,
  isFileUploaded,
  competitorsId,
  handleCompetitorsIdChange,
  addCompetitor,
  addCompetitorFiles,
  competitors,
  competitorsFiles,
  competitorsAll,
  competitorsName,
  handleCompetitorsNameChange,
  competitorsState,
  competitorsFilesState,
  error,
  setError
}) => {
  

  const onClickBack=()=>{
    handlesetStateOfH('Общая таблица')
    setError('')
  }

  return (
    <>
   
    <h3>{stateOfH}</h3>
    <div className={styles.form_row}>
    {competitors&&<button onClick={onClickBack} className={styles.btnAddData}>Назад</button>}
    {competitorsFiles&&<button onClick={onClickBack} className={styles.btnAddData}>Назад</button>}
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
      {error==='Ошибка загрузки картинки,формат должен быть jpg или png и не больше 5 мегабайт'&&
     <div className={styles.modalOverlay}>
      <div className={styles.modalContent }>
      <p className={styles.errorUpload}>{error}</p>
        <span className={styles.modalClose} onClick={() => setError("")}>
     &times;
   </span>
</div>
</div>}
     {competitorsFiles&& <input
        type="text"
        className={styles.competitors_id}
        placeholder="Введите ID конкурента(только цифры)"
        value={competitorsId}
        onChange={handleCompetitorsIdChange}
      />}
      {error==='Вы ввели несуществующий ID конкурента, введите ID, который есть в таблице "Конкуренты"'&&
       <div className={styles.modalOverlay}>
       <div className={styles.modalContent }>
       <p className={styles.errorUpload}>{error}</p>
         <span className={styles.modalClose} onClick={() => setError("")}>
      &times;
    </span>
 </div>
 </div>}
      {competitors&&<input
        type="text"
        className={styles.input_name}
        placeholder="Имя"
        value={competitorsName}
        onChange={handleCompetitorsNameChange}
      />}
    {error==='Вы успешно добавили запись!'&&
       <div className={styles.modalOverlay}>
       <div className={styles.modalContent }>
       <p className={styles.errorUpload}>{error}</p>
         <span className={styles.modalClose} onClick={() => setError("")}>
      &times;
    </span>
 </div>
 </div>}
    {competitors&&<button onClick={addCompetitor} className={styles.btnAddData}>Добавить запись</button>}
    {competitorsFiles&&<button onClick={addCompetitorFiles} className={styles.btnAddData}>Добавить запись</button>}
    {competitorsAll&&<button onClick={()=>handlesetStateOfH('Таблица Конкуренты')} className={styles.btnAddData}>Добавить имя в таблицу 'Конкуренты'</button>}
    {competitorsAll&&<button onClick={()=>handlesetStateOfH('Таблица Файлы конкурентов')} className={styles.btnAddData}>Добавить изображение в таблицу 'Файлы конкурентов'</button>}
    </div>
    <CompetitorTable
     competitorsState={competitorsState}
     competitorsFilesState={competitorsFilesState} 
     fetchTablesData={fetchTablesData}
     stateOfH={stateOfH}
     competitorsAll={competitorsAll}
     competitorsFiles={competitorsFiles}
     competitors={competitors}
      />
    </>
  );
};


export default AddData;