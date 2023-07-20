import React, { useRef, useState } from "react";
import AddData from "./AddData";

const ContainerAddData=()=>{
    const fileInputRef = useRef(null);
    const [imagePath, setImagePath] = useState("");
    const [competitorsId, setСompetitorsId] = useState("");
    const [competitorsName, setCompetitorsName] = useState("");
    const [stateOfH,setStateOfH]=useState("Общая таблица")
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [competitorsState, setCompetitorsState] = useState([]);
    const [competitorsFilesState, setCompetitorsFilesState] = useState([]);
  
   const fetchTablesData=() => {
      fetch('http://localhost:4000/competitors')
        .then((response) => response.json())
        .then((data) => setCompetitorsState(data))
        .catch((error) => console.error(error));
      fetch('http://localhost:4000/files')
        .then((response) => response.json())
        .then((data) => setCompetitorsFilesState(data))
        .catch((error) => console.error(error));
    };
  
    const competitorsAll=stateOfH==='Общая таблица'
    const competitorsFiles=stateOfH==='Таблица Файлы конкурентов'
    const competitors=stateOfH==='Таблица Конкуренты'
  
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadFile(file);
      }
    };
  
    const handleCompetitorsIdChange = (event) => {
      setСompetitorsId(event.target.value);
    };
    const handleCompetitorsNameChange = (event) => {
      setCompetitorsName(event.target.value);
    };
    const handleUploadButtonClick = () => {
      fileInputRef.current.click();
    };
    const handlesetStateOfH=(stateOfH)=>{
      setStateOfH(stateOfH);
    }
  
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
          setImagePath(`http://localhost:4000/images/${data.uploadedFileName}`);
          setIsFileUploaded(true)
          fileInputRef.current.value = ""
          
        })
        .catch((error) => {
          console.error("Ошибка загрузки файла:", error);
          setIsFileUploaded(false)
        });
    };
  
    const addCompetitor = () => {
      fetch("http://localhost:4000/add-competitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitorsName: competitorsName, 
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Запись успешно добавлена в таблицу competitors:", data);
          setCompetitorsName("");
          fetchTablesData()
        })
        .catch((error) => {
          console.error("Ошибка при добавлении записи в таблицу competitors:", error);
        });
    };
    const addCompetitorFiles = () => {
      fetch("http://localhost:4000/add-competitors-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath: imagePath,
          competitorsId: competitorsId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Запись успешно добавлена в таблицу competitors_files:", data);
          setСompetitorsId("");
          setCompetitorsName("");
          fetchTablesData()
          setIsFileUploaded(false)
        })
        .catch((error) => {
          console.error("Ошибка при добавлении записи в таблицу competitors_files:", error);
        });
    };
    return(
       <AddData
       fetchTablesData={fetchTablesData}
       stateOfH={stateOfH}
       handlesetStateOfH={handlesetStateOfH}
       fileInputRef={fileInputRef}
       handleFileSelect={handleFileSelect}
       handleUploadButtonClick={handleUploadButtonClick}
       isFileUploaded={isFileUploaded}
       competitorsId={competitorsId}
       handleCompetitorsIdChange={handleCompetitorsIdChange}
       addCompetitor={addCompetitor}
       addCompetitorFiles={addCompetitorFiles}
       competitors={competitors}
       competitorsFiles={competitorsFiles}
       competitorsAll={competitorsAll}
       competitorsName={competitorsName}
       competitorsState={competitorsState}
       competitorsFilesState={competitorsFilesState}
       handleCompetitorsNameChange={handleCompetitorsNameChange}
       />
    )
  
}

export default ContainerAddData