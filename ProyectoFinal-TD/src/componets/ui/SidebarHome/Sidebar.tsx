import { useLocation } from 'react-router-dom'
import IEmpresa from '../../../types/IEmpresa';
import Card from '../CompanyCard/Card';
import { FC } from 'react';


interface IDisplayPopUp{
  setDisplay:Function
  setdisplayModalCheckEnterprise:Function
}

const Sidebar: FC<IDisplayPopUp> = ({setDisplay,setdisplayModalCheckEnterprise}) => {
  
    
    const location = useLocation(); // Obtener la ubicación actual
  
    const empresas :Array<IEmpresa> = [{
      id: '12345',
      name: 'Taringa.net'
    },
    {
      id: '123435',
      name: 'Cedeco'
    },
    {
      id :"1",
      name:"Capsule Corp",
      sR:"12123",
      cuit:"14232",
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHL5KYyweSzNrl-eztRVQQf-wi6HMxOlJAdg&s"
  },
  {
      id :"2",
      name:"Umbrella",
      sR:"12123",
      cuit:"14232",
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmPh18D98XMKGY638FFXKxthVOjbE6Za8fCQ&s"
  }
  ]
    return (
      <aside>
        
        {location.pathname === '/' && (
          <>
            <h2>Empresas</h2>
  
            <button className='btn btn-light' onClick={()=>{
              setDisplay(true)
            }}>AGREGAR EMPRESA</button>
  
            <div className="cardContainer_aside">
              {
                empresas.map(( empresa => {
                  return <Card key={empresa.id} item={empresa} setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise} />
                }))
              }
            </div>
          </>
        )}
  
        {location.pathname === '/admin' && (
          <ul>
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>
        )}
      </aside>
    );
  };

  export default Sidebar;