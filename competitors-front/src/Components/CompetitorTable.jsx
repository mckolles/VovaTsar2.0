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
  handleSetEditMode
} ) => {

  useEffect(() => {
    fetchTablesData();
  },[] );

  const changeConst= <div className={styles.changeConst}>
  {editMode&&<button><img src="/img/confirm-icon.png" alt="Confirm"></img></button>}
  {!editMode&&<button onClick={()=>handleSetEditMode(true)}><img src="/img/update-icon.png" alt="Update"></img></button>}
  <button><img src="/img/delete-icon.png" alt="Delete"></img></button>
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
        <td>{file.competitors_id}</td>
        <td><img src={file.image} alt="альтернативный текст" style={{ width: '100px', height: '100px' }} /></td>
        <td>
          {name}
          {changeConst}
          </td>
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
              <td>{competitorsTable.name}{changeConst}</td>
              
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
          <th>Изображение</th>
        </tr>
      </thead>
      <tbody>
        {competitorsFilesState.map((competitorsFilesTable)=>{
          return(
            <tr key={competitorsFilesTable.id}>
              <td>{competitorsFilesTable.id}</td>
              <td><img src={competitorsFilesTable.image} alt="альтернативный текст" style={{ width: '100px', height: '100px' }} />{changeConst}</td>
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