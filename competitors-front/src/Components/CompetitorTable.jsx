import React, { useEffect } from 'react';
import styles from '../Styles/CompetitorTable.module.css'

const CompetitorTable = ({
  fetchTablesData,
  competitorsState,
  competitorsFilesState,
  competitorsAll,
  competitorsFiles,
  competitors,
  editMode,
  uploadFile,
  inputCompetitorsName,
  inputCompetitorsId,
  updateCompetitor,
  updateCompetitorFiles,
  handleEdit,
  isLockEditMode,
  updateAll,
  deleteCompetitor,
  deleteCompetitorFiles
  
} ) => {

  useEffect(() => {
    fetchTablesData();
  },[] );


  const updateCompetitorHandle=(id)=>{
      updateCompetitor(id)
      handleEdit(id,false,'delete')
  }

  const updateCompetitorFilesHandle=async(id)=>{
    await updateCompetitorFiles(id)
    handleEdit(id,false,'delete')
  }
  const updateAllhandle=async(id)=>{
    await  updateAll(id)
    handleEdit(id,false,'delete')
  }


  const changeConst=(id,handleMethod,deleteMethod)=> <div className={styles.changeConst}>
  {editMode.includes(id)&&<button key={`confirm-${id}`} onClick={()=>handleMethod(id)}><img src="/img/confirm-icon.png" alt="Confirm"></img></button>}
  {!editMode.includes(id)&&<button  key={`update-${id}`} onClick={()=>handleEdit(id,true,'push')}><img src="/img/update-icon.png" alt="Update"></img></button>}
  <button key={`delete-${id}`} onClick={()=>deleteMethod(id)}><img src="/img/delete-icon.png" alt="Delete"></img></button>
  </div>



  return (
    <div className={styles.competitors_tables}>
   {competitorsAll&&
    <table>
      <thead>
        <tr>
          <th >ID</th>
          <th>ID Конкурента</th>
          <th>Изображение</th>
          <th>Имя</th>
        </tr>
      </thead>
      <tbody>
      {competitorsFilesState.map((file) => {
    const matchingCompetitor = competitorsState.find(
      (competitor) => competitor.id === file.competitors_id
    );
    const name = matchingCompetitor ? matchingCompetitor.name : '';
    return (
      <tr key={file.id}>
        <td>{file.id}</td>
        {!editMode.includes(file.id)&&
        <>
        <td>{file.competitors_id}</td>
        <td><img src={file.image} alt="альтернативный текст" style={{ width: '100px', height: '100px' }} /></td>
        <td>
          {name}
          {!isLockEditMode&&changeConst(file.id,updateAllhandle,deleteCompetitorFiles)}
          </td>
        </>
        }
        {editMode.includes(file.id)&&
        <>
        <td>{inputCompetitorsId}</td>
        <td>{uploadFile}</td>
        <td>
          {inputCompetitorsName}
          {changeConst(file.id,updateAllhandle,deleteCompetitorFiles)}
          </td>
        </>
        }
      </tr>
    );
  })}
      </tbody>
    </table>
    }
    {competitors&&
    <table>
       <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
        </tr>
      </thead>
      <tbody>
        {competitorsState.map((competitorsTable)=>{
          return(
            <tr key={competitorsTable.id}>
              <td>{competitorsTable.id}</td>
              {!editMode.includes(competitorsTable.id)&&<td>{competitorsTable.name}{!isLockEditMode&&changeConst(competitorsTable.id,updateCompetitorHandle,deleteCompetitor)}</td>}
              {editMode.includes(competitorsTable.id)&&
              <>
              <td>
          {inputCompetitorsName}
          {changeConst(competitorsTable.id,updateCompetitorHandle,deleteCompetitor)}
          </td>
        </>
        } 
            </tr>
          )
        })}
      </tbody>
    </table>
    }
    {competitorsFiles&&
    <table>
       <thead>
        <tr>
          <th>ID</th>
          <th>ID Конкурента</th>
          <th>Изображение</th>
        </tr>
      </thead>
      <tbody>
        {competitorsFilesState.map((competitorsFilesTable)=>{
          return(
            <tr key={competitorsFilesTable.id}>
              <td>{competitorsFilesTable.id}</td>
              {!editMode.includes(competitorsFilesTable.id)&&
              <>
              <td>{competitorsFilesTable.competitors_id}</td>
              <td><img src={competitorsFilesTable.image} alt="альтернативный текст" style={{ width: '100px', height: '100px' }} />
              {!isLockEditMode&&changeConst(competitorsFilesTable.id,updateCompetitorFilesHandle,deleteCompetitorFiles)}</td>
              </>
              }
            {editMode.includes(competitorsFilesTable.id)&&
              <>
              <td>{inputCompetitorsId}</td>
              <td>
          {uploadFile}
          {changeConst(competitorsFilesTable.id,updateCompetitorFilesHandle,deleteCompetitorFiles)}
          </td>
        </>
        } 
            </tr>
          )
        })}
      </tbody>
    </table>
    }
    </div>
  );
};

export default CompetitorTable;