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
    const [error,setError]= useState();
    const [editMode,setEditMode]=useState([]);
  
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
      else{
        setError('')
      }
    };
  
    const handleCompetitorsIdChange = (event) => {
        const inputText = event.target.value;
        const onlyDigits = /^\d*$/.test(inputText);
        if (!onlyDigits) {
          return;
        }
        setСompetitorsId(inputText);
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

const handleSetEditMode=(id,method)=>{
  if(method==='push'){
    setEditMode((prevEditMode) => [...prevEditMode, id]);
  }
  if(method==='delete'){
    setEditMode((prevEditMode) => prevEditMode.filter((item) => item !== id))
  }
}

  
    const uploadFile = (file) => {
      const formData = new FormData();
      formData.append("image", file);
      fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError('Ошибка загрузки картинки,формат должен быть jpg или png и не больше 5 мегабайт')
          throw new Error("Ошибка загрузки файла");
        }
      })
        .then((data) => {
          console.log("Файл успешно загружен:", data);
          setImagePath(`http://localhost:4000/images/${data.uploadedFileName}`);
          setIsFileUploaded(true)
          setError('')
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
          setError('Вы успешно добавили запись!')
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
      .then((response) => {
        if (!response.ok) {
          setError('Вы ввели несуществующий ID конкурента, введите ID, который есть в таблице "Конкуренты"');
          return Promise.reject('Invalid ID');
        }
        return response.json();
      })
        .then((data) => {
          console.log("Запись успешно добавлена в таблицу competitors_files:", data);
          setСompetitorsId("");
          setCompetitorsName("");
          fetchTablesData()
          setIsFileUploaded(false)
          setError('Вы успешно добавили запись!')
        })
        .catch((error) => {
          console.error("Ошибка при добавлении записи в таблицу competitors_files:", error);
        });  
    };
    const updateCompetitor = (id) => {
      fetch(`http://localhost:4000/update-competitor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitorsName: competitorsName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Запись успешно обновлена:", data);
          fetchTablesData();
          setError("Вы успешно обновили запись!");
        })
        .catch((error) => {
          console.error("Ошибка при обновлении записи:", error);
        });
    };
  const updateCompetitorFiles = (id) => {
      fetch(`http://localhost:4000/update-competitor-files/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imagePath: imagePath, 
            competitorsId: competitorsId,
          }),
        })
        .then((response) => {
          if (!response.ok) {
            setError('Вы ввели несуществующий ID конкурента, введите ID, который есть в таблице "Конкуренты"');
            return Promise.reject('Invalid ID');
          }
          return response.json();
        })
      }
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
       error={error}
       setError={setError}
       editMode={editMode}
       handleSetEditMode={handleSetEditMode}
       updateCompetitor={updateCompetitor}
       updateCompetitorFiles={updateCompetitorFiles}
       />
    )
  

}

export default ContainerAddData