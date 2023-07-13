import React, { useEffect, useState } from 'react';

const CompetitorTable = () => {
  const [competitors, setCompetitors] = useState([]);
  const [competitorsFiles, setCompetitorsFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/competitors')
      .then((response) => response.json())
      .then((data) => setCompetitors(data))
      .catch((error) => console.error(error));
    fetch('http://localhost:4000/files')
      .then((response) => response.json())
      .then((data) => setCompetitorsFiles(data))
      .catch((error) => console.error(error));
    
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Competitors ID </th>
          <th>Path to file</th>
          <th>Name</th>

        </tr>
      </thead>
      <tbody>
      {competitorsFiles.map((file, index) => {
    const matchingCompetitor = competitors.find(
      (competitor) => competitor.id === file.competitors_id
    );
    const name = matchingCompetitor ? matchingCompetitor.name : '';

    return (
      <tr key={file.id}>
        <td>{file.id}</td>
        <td>{file.competitors_id}</td>
        <td>{file.path}</td>
        <td>{name}</td>
      </tr>
    );
  })}
      </tbody>
    </table>
  );
};

export default CompetitorTable;
