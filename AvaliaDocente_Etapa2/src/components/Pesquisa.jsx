
function Pesquisa(){

    function avaliacoesHandler(){
        console.log("avaliacoesHandler");
    }

    function avaliarHandler(){
        console.log("avaliarHandler");
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