import React from 'react';
import CompetitorTable from './Components/CompetitorTable';
import styles from './app.module.css';
import AddData from './Components/AddData';


const App = () => {
  return (
    <div className={styles.App}>
      <div className={styles.competitors_table}>
        <h1>Справочник конкурентов</h1>
        <AddData />
        <CompetitorTable />
      </div>
    </div>
  );
};

export default App;
