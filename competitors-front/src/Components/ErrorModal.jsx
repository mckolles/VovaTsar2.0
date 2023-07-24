import React from 'react'
import modalStyles from '../Styles/Modal.module.css'

const ErrorModal=({error,setError})=>{
    return (
        <>
        {error&&
        <div className={modalStyles.modalOverlay}>
        <div className={modalStyles.modalContent }>
        <p className={modalStyles.errorUpload}>{error}</p>
          <span className={modalStyles.modalClose} onClick={() => setError("")}>
       &times;
     </span>
  </div>
  </div>}
  </>
    )
}

export default ErrorModal