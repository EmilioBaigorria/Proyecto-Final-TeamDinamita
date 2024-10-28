import { useLocation } from 'react-router-dom'
import IEmpresa from '../../../types/IEmpresa';
import Card from '../CompanyCard/Card';
import { FC } from 'react';


interface IDisplayPopUp{
  setDisplay:Function
}

const Sidebar: FC<IDisplayPopUp> = ({setDisplay}) => {
  
    
    const location = useLocation(); // Obtener la ubicación actual
  
    const empresas :Array<IEmpresa> = [{
      id: '12345',
      name: 'Taringa.net'
    },
    {
      id: '123435',
      name: 'Cedeco'
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
                  return <Card key={empresa.id} item={empresa} />
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