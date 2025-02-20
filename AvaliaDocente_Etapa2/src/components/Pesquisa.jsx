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

    const [lembrarPesquisa, setLembrarPesquisa] = useState(false)

    useEffect(() => {
        const ultimaPesquisa = JSON.parse(localStorage.getItem("ultimaPesquisa"));
        if (ultimaPesquisa) {
            setUniversidade(ultimaPesquisa.memoryUniversidade);
            setDocente(ultimaPesquisa.memoryDocente);
            setLembrarPesquisa(true);
        }
    }, []);

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
            alert(`Erro ao buscar sugestões: ${error.message}`);
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
            alert(`Erro ao buscar sugestões: ${error.message}`);
        });

    }, [universidade, docente, mostrarSugestoesDocente])

    function avaliacoesHandler(){
        if (lembrarPesquisa){
            localStorage.setItem("ultimaPesquisa", JSON.stringify({"memoryUniversidade": universidade, "memoryDocente": docente}))
        }
        else{
            localStorage.removeItem("ultimaPesquisa")
        }
        fetch('http://localhost:3000/pesquisa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar opções de pesquisa');
            }
            return response.json();
        })
        .then((data) => {
        if (data.find( elemento => elemento.universidade === universidade && elemento.professores.includes(docente))){
            navigate('/avaliacoes', {state: {universidade, docente}});
        }
        else{
            alert(`Universidade ${universidade} e/ou professor ${docente} não presentes na base de dados.`);
            window.location.reload();
        }
        })
        .catch((error) => {
            alert(`Erro ao buscar sugestões: ${error.message}`);
        });
    }

    function avaliarHandler(){
        if (lembrarPesquisa){
            localStorage.setItem("ultimaPesquisa", JSON.stringify({"memoryUniversidade": universidade, "memoryDocente": docente}))
        }
        else{
            localStorage.removeItem("ultimaPesquisa")
        }
        fetch('http://localhost:3000/pesquisa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar opções de pesquisa');
            }
            return response.json();
        })
        .then((data) => {
        if (data.find( elemento => elemento.universidade === universidade && elemento.professores.includes(docente))){
            navigate('/avaliar', {state: {universidade, docente}});
        }
        else{
            alert(`Universidade ${universidade} e/ou professor ${docente} não presentes na base de dados.`);
            window.location.reload();
        }
        })
        .catch((error) => {
            alert(`Erro ao buscar sugestões: ${error.message}`);
        });
    }

    const adicionarHandler = async () => {
        fetch('http://localhost:3000/pesquisa', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar universidades');
            }
            return response.json();
        })
        .then((data) => {
            const objUniversidade = data.find((elemento) => elemento.universidade.trim().toUpperCase() === universidade.trim().toUpperCase())
            if(objUniversidade){
                if(docente && !objUniversidade.professores.find(elemento => elemento.trim().toUpperCase() === docente.trim().toUpperCase())){
                    fetch(`http://localhost:3000/pesquisa/${objUniversidade.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({professores: [...objUniversidade.professores, docente]})
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(`Erro ao adicionar o professor(a) ${docente} a universidade ${universidade}`);
                        }
                        alert("Adição de universidade/dicente bem sucedida.")
                        return response.json();
                    })
                    .catch((error) => {
                        alert(`${error.message}`)
                    });
                }
                else{
                    alert(`Professor ${docente} já presente na universidade ${universidade}`)
                }
            }
            else{
                const listaDocentes = docente ? [docente] : []
                if (universidade !== ""){
                    fetch('http://localhost:3000/pesquisa', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "universidade" : universidade,
                            "professores" : listaDocentes
                        }) // Converte o objeto para JSON
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Erro ao adicionar nova universidade ${universidade} e professor ${docente}`);
                        }
                        alert("Adição de universidade bem sucedida.")
                        return response.json();
                    })
                    .catch((error) => {
                        alert(`Erro: ${error.message}`)
                    });
                }
                else{
                    alert("Preencha o campo universidade.")
                }
            }
        })
        .catch((error) => {
            alert(`Erro ao tentar adicionar: ${error}`);
        });
        
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
            alert("Click não identificado.")
        }
    };

    const handleCheckboxChange = (e) => {
        setLembrarPesquisa(e.target.checked);
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
            <label><input type="checkbox" checked={lembrarPesquisa} onChange={handleCheckboxChange}/> Lembrar minha pesquisa</label>
            <div className="button-group">
                <button type="button" onClick={avaliacoesHandler} className="custom-button">Avaliações</button>
                <button type="button" onClick={avaliarHandler} className="custom-button">Avaliar</button>
                <button type="button" onClick={adicionarHandler} className="custom-button">Adicionar</button>
            </div>
        </div>
    )
}

export default Pesquisa;