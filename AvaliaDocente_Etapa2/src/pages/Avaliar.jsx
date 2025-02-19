import Header from "../components/Header"
import FormAvaliacao from "../components/FormAvaliacao"
import { useLocation } from "react-router-dom";

function Avaliar(){
    const location = useLocation();
    const { universidade, docente } = location.state || {}; // Caso não tenha state, evita erro
    return (
        <>
            <Header/>
            <FormAvaliacao universidade={universidade} docente={docente}/>
        </>
    )
}

export default Avaliar