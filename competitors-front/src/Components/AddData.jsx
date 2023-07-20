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
  competitorsFilesState
}) => {

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