import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Pesquisa(){
    const navigate = useNavigate()
    const [universidade, setUniversidade] = useState('');
    const [sugestoesUniversidades, setSugestoesUniversidades] = useState([]);
    const [mostrarSugestoesUniversidade, setMostrarSugestoesUniversidade] = useState(false);

    const [docente, setDocente] = useState('');
    const [sugestoesDocente, setSugestoesDocentes] = useState([]);
    const [mostrarSugestoesDocente, setMostrarSugestoesDocente] = useState(false);

    // Função para buscar sugestões da API
    useEffect(() => {
        if (universidade.trim() === '' || !mostrarSugestoesUniversidade) {
            setSugestoesUniversidades([]);
            return;
        }

        // Faz a requisição à API usando fetch
        fetch('http://localhost:3000/pesquisa', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar sugestões');
            }
            return response.json();
        })
        .then((data) => {
            const nomesUniversidades = data.map(elemento => {
                return elemento.universidade
            });
            setSugestoesUniversidades(nomesUniversidades.filter(elemento => elemento.toUpperCase().includes(universidade.trim().toUpperCase())));
        })
        .catch((error) => {
            console.error('Erro ao buscar sugestões:', error);
        });
    }, [universidade, mostrarSugestoesUniversidade]);

    useEffect(() => {
        if (docente.trim() === '' || !mostrarSugestoesDocente) {
            setSugestoesDocentes([]);
            return;
        }

        // Faz a requisição à API usando fetch
        fetch('http://localhost:3000/pesquisa', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar sugestões');
            }
            return response.json();
        })
        .then((data) => {
            const objUniversidade = data.filter(elemento => elemento.universidade.trim().toUpperCase() === universidade.trim().toUpperCase())
            if(objUniversidade.length > 0){
                const professoresFiltrados = objUniversidade[0].professores.filter(professor => 
                    professor.toUpperCase().includes(docente.trim().toUpperCase()));
                setSugestoesDocentes(professoresFiltrados);
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar sugestões:', error);
        });

    }, [universidade, docente, mostrarSugestoesDocente])

    function avaliacoesHandler(){
        navigate('/avaliacoes')
    }

    function avaliarHandler(){
        navigate('/avaliar')
    }

    function adicionarHandler(){
        console.log('ADICIONOU')
    }

    const handleSugestaoClick = (nome, type) => {
        if (type === "universidade"){
            setUniversidade(nome);
            setMostrarSugestoesUniversidade(false);
        }
        else if(type === "docente"){
            setDocente(nome)
            setMostrarSugestoesDocente(false);
        }
        else{
            console.log("Click não identificado.")
        }
    };

    return(
        <div className="container-pesquisa">
            <div className="input-container">
                <input type="text"
                    id="universidade"
                    value={universidade}
                    onChange={(e) => {setUniversidade(e.target.value); setMostrarSugestoesUniversidade(true)}}
                    placeholder="Universidade"
                    className="custom-input"
                />
                {sugestoesUniversidades.length > 0 && (
                    <ul className="sugestoes-lista">
                        {sugestoesUniversidades.map((sugestao, index) => (
                        <li
                            key={index}
                            onClick={() => handleSugestaoClick(sugestao, "universidade")}
                            className="sugestao-item"
                        >
                            {sugestao}
                        </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="input-container">
                <input type="text"
                    id="docente"
                    value={docente}
                    onChange={(e) => {setDocente(e.target.value); setMostrarSugestoesDocente(true)}}
                    placeholder="Docente"
                    className="custom-input"
                />
                {sugestoesDocente.length > 0 && (
                    <ul className="sugestoes-lista">
                        {sugestoesDocente.map((sugestao, index) => (
                        <li
                            key={index}
                            onClick={() => handleSugestaoClick(sugestao, "docente")}
                            className="sugestao-item"
                        >
                            {sugestao}
                        </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="button-group">
                <button type="button" onClick={avaliacoesHandler} className="custom-button">Avaliações</button>
                <button type="button" onClick={avaliarHandler} className="custom-button">Avaliar</button>
                <button type="button" onClick={adicionarHandler} className="custom-button">Adicionar</button>
            </div>
        </div>
    )
}

export default Pesquisa;