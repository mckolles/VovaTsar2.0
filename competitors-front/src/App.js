import React from 'react';
import CompetitorTable from './Components/CompetitorTable';
import styles from './app.module.css';


const App = () => {
  
  return (
    <div className={styles.App}>
      <div className={styles.competitors_table}>
        <h1>Справочник конкурентов</h1>
        <CompetitorTable />
      </div>
    </div>
  );
};

export default App;
