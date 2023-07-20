import React from 'react';
import styles from './app.module.css';
import ContainerAddData from './Components/ContainerAddData';


const App = () => {
  
  return (
    <div className={styles.App}>
      <div className={styles.competitors_table}>
        <h1>Справочник конкурентов</h1>
        <ContainerAddData />
      </div>
    </div>
  );
};

export default App;
