import React from 'react'
import IEmpresa from '../../../types/IEmpresa'


import styles from './Card.module.css'

const Card: React.FC<{ item: IEmpresa }> = ({ item }) => {
  return (
    <div className="card" key={item.id}>
      <p className={styles.card_title}>{item.name}</p>
      <div className={styles.btn_group}>
        <button style={{ width: '50px' }} className='btn btn-outline-primary'><span className="material-symbols-outlined">
                    visibility
                </span></button>
        <button style={{ width: '50px' }} className='btn btn-outline-dark'><span  className="material-symbols-outlined">
                    edit
                </span></button>
      </div>
    </div>
  )
}

export default Card