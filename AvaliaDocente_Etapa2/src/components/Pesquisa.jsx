import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Pesquisa(){
    const navigate = useNavigate()
    const [universidade, setUniversidade] = useState('');
    const [sugestoes, setSugestoes] = useState([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

    // Função para buscar sugestões da API
    useEffect(() => {
        if (universidade.trim() === '' || !mostrarSugestoes) {
            setSugestoes([]);
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
            return response.json(); // Converte a resposta para JSON
        })
        .then((data) => {
            const nomesUniversidades = data.map(elemento => {
                return elemento.universidade
            });
            setSugestoes(nomesUniversidades.filter(elemento => elemento.toUpperCase().includes(universidade.trim().toUpperCase()))); // Atualiza as sugestões com os dados da API
        })
        .catch((error) => {
            console.error('Erro ao buscar sugestões:', error);
        });
    }, [universidade, mostrarSugestoes]); // Executa sempre que o valor de "universidade" mudar

    function avaliacoesHandler(){
        navigate('/avaliacoes')
    }

    function avaliarHandler(){
        navigate('/avaliar')
    }

    function adicionarHandler(){
        console.log('ADICIONOU')
    }

    const handleSugestaoClick = (nome) => {
        setUniversidade(nome);
        setMostrarSugestoes(false);
    };

    return(
        <div className="container-pesquisa">
            <div className="input-container">
                <input type="text"
                    id="universidade"
                    value={universidade}
                    onChange={(e) => {setUniversidade(e.target.value); setMostrarSugestoes(true)}}
                    placeholder="Universidade"
                    className="custom-input"
                />
                {sugestoes.length > 0 && (
                    <ul className="sugestoes-lista">
                        {sugestoes.map((sugestao, index) => (
                        <li
                            key={index}
                            onClick={() => handleSugestaoClick(sugestao)}
                            className="sugestao-item"
                        >
                            {sugestao}
                        </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="input-container">
                <input type="text" id="docente" placeholder="Docente" className="custom-input"/>
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