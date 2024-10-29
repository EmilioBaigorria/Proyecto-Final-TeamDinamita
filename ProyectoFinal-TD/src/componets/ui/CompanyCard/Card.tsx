import React, { FC } from 'react'
import IEmpresa from '../../../types/IEmpresa'


import styles from './Card.module.css'
import { useAppDispatch } from '../../../hooks/redux'
import { setActiveEnterprise } from '../../../redux/slices/ActiveEnterpriseReducer'
interface ICard{
  item:IEmpresa
}
const Card:FC<ICard> = ({ item }) => {
  const dispatch = useAppDispatch();
  const handleOpenSetActiveEntreprise=(item :IEmpresa)=>{
    dispatch(setActiveEnterprise({element :item}))
  }
  return (
    <div className="card" key={item.id}>
      <p className={styles.card_title}>{item.name}</p>
      <div className={styles.btn_group}>
        <button style={{ width: '50px' }} className='btn btn-outline-primary' onClick={()=>{
          handleOpenSetActiveEntreprise(item)
        }}><span className="material-symbols-outlined">
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