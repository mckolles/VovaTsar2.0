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
  editMode,
  setIsFileUploaded,
  setImagePath,
  updateCompetitor,
  updateCompetitorFiles,
  handleEdit,
  isLockEditMode,
  updateAll,
  deleteCompetitor,
  deleteCompetitorFiles
}) => {
  

  const onClickBack=()=>{
    handlesetStateOfH('Общая таблица')
    setError('')
    handleEdit(null,false,'clear')
  }

  const onClickTables=(tableName)=>{
    handlesetStateOfH(tableName)
    setIsFileUploaded(false)
    setImagePath('')
    handleEdit(null,false,'clear')
    
  }

  const inputCompetitorsName=
  <input
  type="text"
  className={styles.input_name}
  placeholder="Имя"
  value={competitorsName}
  onChange={handleCompetitorsNameChange}
/>

const inputCompetitorsId=
<input
        type="text"
        className={styles.competitors_id}
        placeholder="Введите ID конкурента(только цифры)"
        value={competitorsId}
        onChange={handleCompetitorsIdChange}
      />
const uploadFile=<>
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
      </>
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
   {!editMode.length>0&&inputCompetitorsName}
    <button onClick={addCompetitor} className={styles.btnAddData}>Добавить запись</button>
    </>
    }

    {competitorsFiles&&
    <>
    <button onClick={onClickBack} className={styles.btnAddData}>Назад</button>
    {!editMode.length>0&&uploadFile}
    {!editMode.length>0&&inputCompetitorsId}   
    <button onClick={addCompetitorFiles} className={styles.btnAddData}>Добавить запись</button>
    </>
    }

    {competitorsAll&&<button onClick={()=>onClickTables('Таблица Конкуренты')} className={styles.btnAddData}>Добавить имя в таблицу 'Конкуренты'</button>}
    {competitorsAll&&<button onClick={()=>onClickTables('Таблица Файлы конкурентов')} className={styles.btnAddData}>Добавить изображение в таблицу 'Файлы конкурентов'</button>}
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
     inputCompetitorsId={inputCompetitorsId}
     inputCompetitorsName={inputCompetitorsName}
     uploadFile={uploadFile}
     updateCompetitor={updateCompetitor}
     updateCompetitorFiles={updateCompetitorFiles}
     handleEdit={handleEdit}
     isLockEditMode={isLockEditMode}
     updateAll={updateAll}
     deleteCompetitor={deleteCompetitor}
     deleteCompetitorFiles={deleteCompetitorFiles}
      />
    </>
  );
};

export default AddData