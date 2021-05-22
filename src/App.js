import { Fragment, useState } from 'react';
import './App.css';
import axios from 'axios';
import Button from './components/Button'
const App = () => {

  const [datosUsuario,setDatosUsuario] = useState([])
  const [loading,setLoading] = useState(false);
  const [usuarioActivo,setUsuarioActivo] = useState(false);
  const [linkActivo,setLinkActivo] = useState(0);

  const onClickHandler = () => {
    setLinkActivo(0);
    setLoading(true);
    axios.get('https://randomuser.me/api/')
    .then((response)=>{
      console.log(response.data.results);
      setDatosUsuario(response.data.results);
    }).catch((error)=>{
      console.log(error);
      setLoading(true);
    }).finally(()=>{
      setLoading(false);
      setUsuarioActivo(true);
    })
  }


  const icons = [
    'fas fa-user fa-4x',
    'fas fa-envelope fa-4x',
    'fas fa-calendar-alt fa-4x',
    'fas fa-map-marker fa-4x',
    'fas fa-phone fa-4x',
    'fas fa-lock fa-4x',
  ];

  const GeneradordeFrases = ({user}) => {
  const frases = [
    `Hola mi nombre es ${user.name.first} ${user.name.last}`,
    `Mi correo es ${user.email}`,
    `Nací el ${user.dob.date.slice(0,10)}`,
    `En ${user.location.country}`,
    `Me contactas al ${user.phone}`,
    `Mi clave es ${user.login.password}`
  ];

    return <h2>{frases[usuarioActivo]}</h2>
  }

  const activeLinkHandler = (index) => {
    setLinkActivo(index);
  }


  const style= {
    color:"green",
  }
  return (
    <div className="App">
      <h1> Usuario al azar</h1>
      <Button isActive={usuarioActivo} clicked={onClickHandler}/>
      {loading ? (
        <h1>Cargando...</h1>
      ):(
        <div className="app__user">
          {datosUsuario.map((user,index)=>{
            return(
              <Fragment key={user.cell}>
                <img src={user.picture.large} alt={user.name.first}></img>
                <GeneradordeFrases user={user}/>
                  <div className="app__icons">
                    {icons.map((icon,index)=>{
                      return(
                        <i className={icon} key={index} onMouseEnter={()=>activeLinkHandler(index)} style={linkActivo===index ? style : null}></i>
                      )
                    })}
                  </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
