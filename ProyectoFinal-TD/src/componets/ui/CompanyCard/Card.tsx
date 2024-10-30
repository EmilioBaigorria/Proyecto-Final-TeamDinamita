import { FC } from 'react'
import styles from './Card.module.css'
import { useAppDispatch } from '../../../hooks/redux'
import { setActiveEnterprise } from '../../../redux/slices/ActiveEnterpriseReducer'
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa'
interface ICard{
  item:IEmpresa
  setdisplayModalCheckEnterprise:Function
  setDisplayModalEditEnterprise: Function
}
const Card:FC<ICard> = ({ item,setdisplayModalCheckEnterprise, setDisplayModalEditEnterprise }) => {
  const dispatch = useAppDispatch();
  const handleOpenSetActiveEntreprise=(item :IEmpresa)=>{
    setdisplayModalCheckEnterprise(true)
    dispatch(setActiveEnterprise({element :item}))
  }

  const handleOpenEditModal = (item :IEmpresa) => {
    setDisplayModalEditEnterprise(true)
    dispatch(setActiveEnterprise({element :item}))
  }
  return (
    <div className="card" key={item.id}>
      <p className={styles.card_title}>{item.nombre}</p>
      <div className={styles.btn_group}>
        <button style={{ width: '50px' }} className='btn btn-outline-primary' onClick={()=>{
          handleOpenSetActiveEntreprise(item)
        }}><span className="material-symbols-outlined">
                    visibility
                </span></button>
        <button style={{ width: '50px' }} className='btn btn-outline-dark' onClick={()=>handleOpenEditModal(item)}><span  className="material-symbols-outlined">
                    edit
                </span></button>
      </div>
    </div>
  )
}

export default Card