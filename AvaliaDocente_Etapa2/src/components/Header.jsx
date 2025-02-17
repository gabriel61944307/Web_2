
import logo from '../assets/logo.png'

function Header(){
  return (
    <header id="cabecalho">
      <img src={logo} onClick={() => window.location.href = '/'}  alt="Logo Avalia Docente" style={{cursor: 'pointer'}}/>
    </header>
  )
}

export default Header;