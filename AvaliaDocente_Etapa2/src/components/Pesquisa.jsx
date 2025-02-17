import { useNavigate } from "react-router-dom";

function Pesquisa(){
    const navigate = useNavigate()

    function avaliacoesHandler(){
        navigate('/avaliacoes')
    }

    function avaliarHandler(){
        navigate('/avaliar')
    }

    return(
        <div className="container-pesquisa">
            <input type="text" id="universidade" placeholder="Universidade" className="custom-input"/>
            <input type="text" id="docente" placeholder="Docente" className="custom-input"/>

            <div className="button-group">
                <button type="button" onClick={avaliacoesHandler} className="custom-button">Avaliações</button>
                <button type="button" onClick={avaliarHandler} className="custom-button">Avaliar</button>
            </div>
        </div>
    )
}

export default Pesquisa;