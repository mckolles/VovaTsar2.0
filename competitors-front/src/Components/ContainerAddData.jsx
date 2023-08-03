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
    const [isLockEditMode, setIsLockEditMode] = useState(false);

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

    const handleEdit=(id, isLocked,method)=>{
      handleSetEditMode(id, method)
      setIsLockEditMode(isLocked)
    }
    
    const handleSetEditMode = (id, method) => {
      if (method === 'push') {
        setEditMode((prevEditMode) => [...prevEditMode, id]);
      } else if (method === 'delete') {
        setEditMode((prevEditMode) => prevEditMode.filter((item) => item !== id));
      } 
        else if(method==='clear'){
          setEditMode([])
        }
    };


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
          if(!competitorsName){
            setError('Вы не указали имя!')
            return
          }
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
          throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (isFileUploaded) {
            console.log("Запись успешно обновлена:", data); 
            setIsFileUploaded(false);
            setСompetitorsId("")
            fetchTablesData();
            setError("Вы успешно обновили запись!");
            console.log("Запись успешно добавлена в таблицу competitors_files:", data);
          } 
          else if (!competitorsId){
            setError("Введите ID конкурента")
            return
          }
          else if (!isFileUploaded){
            setError("Вы не загрузили фотографию!");
            return
          }
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
          if(!competitorsName){
            setError('Вы не указали имя!')
            return
          }
          console.log("Запись успешно обновлена:", data); 
          setCompetitorsName("");
          fetchTablesData();
          setError("Вы успешно обновили запись!");
        })
        .catch((error) => {
          console.error("Ошибка при обновлении записи:", error);
        });
    };
    const updateCompetitorFiles = async(id) => {
      try {
        await fetch(`http://localhost:4000/update-competitor-files/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath: imagePath, 
          competitorsId: competitorsId,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          setСompetitorsId("")
          setError('Вы ввели несуществующий ID конкурента, введите ID, который есть в таблице "Конкуренты"');
          throw new Error('Invalid ID'); 
        }
        return response.json(); 
      })
      .then((data) => {
        if (isFileUploaded) {
          console.log("Запись успешно обновлена:", data); 
          setIsFileUploaded(false);
          setСompetitorsId("")
          fetchTablesData();
          setError("Вы успешно обновили запись!");
        } 
        else if (!competitorsId){
          setError("Введите ID конкурента")
          return
        }
        else if (!isFileUploaded){
          setError("Вы не загрузили фотографию!");
          return
        }
      })
      .catch((error) => {
        console.error("Ошибка при обновлении записи:", error);
      });
      }
      catch (error) {
        console.error("Ошибка при обновлении записи:", error);
      }
    }
    
    const updateAll = async(id) => {
      try {
        await fetch(`http://localhost:4000/update-all/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath: imagePath, 
          competitorsId: competitorsId,
          competitorsName: competitorsName
        }),
      })
      .then((data) => {
        if (isFileUploaded) {
          console.log("Запись успешно обновлена:", data); 
          setIsFileUploaded(false);
          setСompetitorsId("")
          setCompetitorsName("");
          fetchTablesData();
          setError("Вы успешно обновили запись!");
        } 
        if (!competitorsId){
          setError("Введите ID конкурента")
          return 
        }
        else if (!isFileUploaded){
          setError("Вы не загрузили фотографию!");
          return 
        }
        else if(!competitorsName){
          setError("Вы не указали имя");
          return 
        }
        else if(!competitorsName&&!isFileUploaded&&!competitorsId){
          setError("Все поля обязательны!")
          return
        }
      })
      .then((response) => {
        if (!response.ok) {
          setСompetitorsId("")
          setIsFileUploaded(false);
          setCompetitorsName("");
          setError('Вы ввели несуществующий ID конкурента, введите ID, который есть в таблице "Конкуренты"');
          throw new Error('Invalid ID'); 
        } 
        return response.json();
      })
      .catch((error) => {
        console.error("Ошибка при обновлении записи:", error);
      });
      
      }
      catch (error) {
        console.error("Ошибка при обновлении записи:", error);
      }
    }

    const deleteCompetitor=async(id)=>{
      try {
        await fetch(`http://localhost:4000/delete-comptitor/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        if (response.ok) {
          setError('Вы вуспешно удалили запись!');
          fetchTablesData();
          return response.json();
        }
        else{
          throw new Error('Invalid ID'); 
        }
      })
    }
      catch (error) {
        setError(`К сожалению произошла ошибка.${error}`)
        console.error("Ошибка при обновлении записи:", error);
      }
    }
    const deleteCompetitorFiles=async(id)=>{
      try {
        await fetch(`http://localhost:4000/delete-comptitor-files/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        if (response.ok) {
          setError('Вы вуспешно удалили запись!');
          fetchTablesData();
          return response.json();
        }
        else{
          throw new Error('Invalid ID'); 
        }
      })
    }
      catch (error) {
        setError(`К сожалению произошла ошибка.${error}`)
        console.error("Ошибка при обновлении записи:", error);
      }
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
       setIsFileUploaded={setIsFileUploaded}
       setImagePath={setImagePath}
       isLockEditMode={isLockEditMode}
       handleEdit={handleEdit}
       updateAll={updateAll}
       deleteCompetitor={deleteCompetitor}
       deleteCompetitorFiles={deleteCompetitorFiles}

       />
    )
  

}

export default ContainerAddData