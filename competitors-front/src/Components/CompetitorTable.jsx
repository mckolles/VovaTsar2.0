import React, { useEffect } from 'react';

const CompetitorTable = ({
  fetchTablesData,
  competitorsState,
  competitorsFilesState,
  competitorsAll,
  competitorsFiles,
  competitors
} ) => {

  useEffect(() => {
    fetchTablesData();
  }, );

  return (
    <>
   {competitorsAll&&
    <table>
      <thead>
        <tr>
          <th>ID</th>
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
        <td>{name}</td>
      </tr>
    );
  })}
      </tbody>
    </table>}
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
              <td>{competitorsTable.name}</td>
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
              <td><img src={competitorsFilesTable.image} alt="альтернативный текст" style={{ width: '100px', height: '100px' }} /></td>
            </tr>
          )
        })}
      </tbody>
    </table>
    }
    </>
  );
};

export default CompetitorTable;