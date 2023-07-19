import React, { useEffect, useState } from 'react';
import AddData from './AddData';

const CompetitorTable = () => {
  const [competitors, setCompetitors] = useState([]);
  const [competitorsFiles, setCompetitorsFiles] = useState([]);

 const fetchTablesData=() => {
    fetch('http://localhost:4000/competitors')
      .then((response) => response.json())
      .then((data) => setCompetitors(data))
      .catch((error) => console.error(error));
    fetch('http://localhost:4000/files')
      .then((response) => response.json())
      .then((data) => setCompetitorsFiles(data))
      .catch((error) => console.error(error));
    
  };
  useEffect(() => {
    fetchTablesData();
  }, []);
  

  return (
    <>
    <AddData fetchTablesData={fetchTablesData}  />
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
      {competitorsFiles.map((file) => {
    const matchingCompetitor = competitors.find(
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
    </table>
    </>
  );
};

export default CompetitorTable;