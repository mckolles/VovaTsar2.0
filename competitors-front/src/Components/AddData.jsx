import React from "react";
import styles from '../Styles/AddData.module.css';
import CompetitorTable from "./CompetitorTable";
import ErrorModal from "./ErrorModal";

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
  setError,
  handleSetEditMode,
  editMode
}) => {
  

  const onClickBack=()=>{
    handlesetStateOfH('Общая таблица')
    setError('')
  }

  return (
    <>
      <div className={styles.header}>
     <h1>Справочник конкурентов</h1>
      <h3>{stateOfH}</h3>
      </div>
    <div className={styles.form_row}>
    <ErrorModal error={error} setError={setError}  />

    {competitors&&
    <>
    <button onClick={onClickBack} className={styles.btnAddData}>Назад</button>
    <input
        type="text"
        className={styles.input_name}
        placeholder="Имя"
        value={competitorsName}
        onChange={handleCompetitorsNameChange}
      />
    <button onClick={addCompetitor} className={styles.btnAddData}>Добавить запись</button>
    </>
    }

    {competitorsFiles&&
    <>
    <button onClick={onClickBack} className={styles.btnAddData}>Назад</button>
      <input
        type="file"
        className={styles.file_input}
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <button className={styles.btn_upload} onClick={handleUploadButtonClick}>
        {isFileUploaded?'Успешно загружено':'Загрузите изображение'}
      </button>
       <input
        type="text"
        className={styles.competitors_id}
        placeholder="Введите ID конкурента(только цифры)"
        value={competitorsId}
        onChange={handleCompetitorsIdChange}
      />
    <button onClick={addCompetitorFiles} className={styles.btnAddData}>Добавить запись</button>
    </>
    }

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
     handleSetEditMode={handleSetEditMode}
     editMode={editMode}
      />
    </>
  );
};


export default AddData;