import React from 'react'
import IEmpresa from '../../../types/IEmpresa'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from './Card.module.css'

const Card: React.FC<{ item: IEmpresa }> = ({ item }) => {
  return (
    <div className="card" key={item.id}>
      <p className={styles.card_title}>{item.name}</p>
      <div className={styles.btn_group}>
        <button style={{ width: '50px' }} className='btn btn-outline-primary'><i className="bi bi-eye-fill"></i></button>
        <button style={{ width: '50px' }} className='btn btn-outline-dark'><i className="bi bi-pencil-fill"></i></button>
      </div>
    </div>
  )
}

export default Card