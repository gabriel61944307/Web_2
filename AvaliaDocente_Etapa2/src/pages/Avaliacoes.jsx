import { useState, useEffect } from "react"
import Header from "../components/Header"
import simImg from '../assets/sim.png'
import naoImg from '../assets/nao.png'
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";

function Avaliacoes(){
    //Informações necessárias para o fetching
    const location = useLocation();
    const { universidade, docente } = location.state || {};
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [erro, setErro] = useState(null);
    const [infosGerais, setInfosGerais] = useState({
        "didatica": 0,
        "tirarDuvidas": 0,
        "metodologia": 0,
        "conteudo": 0,
        "correcao": 0,
        "presencaSim": 0,
        "presencaNao": 0,
        "materias": []
    });
    const [filtro, setFiltro] = useState([true, false, false])

    useEffect(() => {
        try{
            fetch('http://localhost:3000/avaliacoes', {
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
                data = data.filter( avaliacao => avaliacao.nome === docente && avaliacao.universidade === universidade)
                
                let mediaDidatica = 0, mediaTirarDuvidas = 0, mediaMetodologia = 0, mediaConteudo = 0, mediaCorrecao = 0, presencaSim = 0, presencaNao = 0;
                let materias = []
                data.forEach( elemento => {
                    mediaDidatica += elemento.avaliacao.didatica;
                    mediaTirarDuvidas += elemento.avaliacao.tirarDuvidas;
                    mediaMetodologia += elemento.avaliacao.metodologia;
                    mediaConteudo += elemento.avaliacao.conteudo;
                    mediaCorrecao += elemento.avaliacao.correcao;
                    elemento.presenca ? presencaSim++ : presencaNao++;
                    
                    if (elemento.materias.length > 0){
                        elemento.materias.forEach(materia =>{
                            if (!materias.includes(materia)) materias.push(materia)
                        })
                    }
                })
                
                mediaDidatica = data.length ? mediaDidatica / data.length : 0
                mediaTirarDuvidas = data.length ? mediaTirarDuvidas / data.length : 0
                mediaMetodologia = data.length ? mediaMetodologia / data.length : 0
                mediaConteudo = data.length ? mediaConteudo / data.length : 0
                mediaCorrecao = data.length ? mediaCorrecao / data.length : 0

                setInfosGerais({
                    "didatica": mediaDidatica,
                    "tirarDuvidas": mediaTirarDuvidas,
                    "metodologia": mediaMetodologia,
                    "conteudo": mediaConteudo,
                    "correcao": mediaCorrecao,
                    "presencaSim": presencaSim,
                    "presencaNao": presencaNao,
                    "materias": materias
                });

                setAvaliacoes(data);
            })
            .catch((error) => {
                alert(`Erro ao buscar sugestões: ${error.message}`);
            });
        } catch (error){
            setErro(error.message)
        }
    }, [docente, universidade]);

    if(erro) return <p>Erro: {erro}</p>

    return (
        <>
            <Header/>
            {/* <p>{JSON.stringify(infosGerais)}</p> */}
            <div className="flexCentralizado" style={{flexDirection : "column" }}>
                <a style={{ padding: "20px", fontWeight: "bold", fontSize: "large" }}>Avaliações do professor {docente}</a>

                <div id="avaliacoes-gerais">
                    <div className="avaliacao-geral" style={{padding: "5px"}}>
                        <div className="avaliacao">
                            <span className="titulo-nota">Didática</span>
                            <div className="container-barra">
                                <div className="barra-verde" style={{width: String(infosGerais.didatica*20)+"%"}}>{infosGerais.didatica.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="avaliacao">
                            <span className="titulo-nota">Disposição em tirar duvidas</span>
                            <div className="container-barra">
                                <div className="barra-vermelha" style={{width: String(infosGerais.tirarDuvidas*20)+"%"}}>{infosGerais.tirarDuvidas.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="avaliacao">
                            <span className="titulo-nota">Metodologia de avaliações</span>
                            <div className="container-barra">
                                <div className="barra-vermelha" style={{width: String(infosGerais.metodologia*20)+"%"}}>{infosGerais.metodologia.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="avaliacao">
                            <span className="titulo-nota">Coerência com conteúdo cobrado</span>
                            <div className="container-barra">
                                <div className="barra-verde" style={{width: String(infosGerais.conteudo*20)+"%"}}>{infosGerais.conteudo.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="avaliacao">
                            <span className="titulo-nota">Coerência na correção</span>
                            <div className="container-barra">
                                <div className="barra-vermelha" style={{width: String(infosGerais.correcao*20)+"%"}}>{infosGerais.correcao.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                    <div id ="presenca" className="avaliacao-geral">
                        <a>Cobra presença</a>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <img src={simImg} alt="sim" style={{width: "20px", height: "20px"}}/>
                            <img src={naoImg} alt="nao" style={{width: "20px", height: "20px"}}/>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p style={{fontWeight: "900"}}>{infosGerais.presencaSim}</p>
                            <p style={{fontWeight: "900"}}>{infosGerais.presencaNao}</p>
                        </div>
                    </div>
                    <div id ="disciplinas" className="avaliacao-geral">
                        <div style={{borderBottom: "2px solid #000000", marginBottom: "10px"}}>Disciplinas</div>
                        {infosGerais.materias.map(elemento => {
                            return <p key={elemento}>{elemento}</p>
                        })}
                    </div>
                </div>
                <div id="avaliacoes-individuais">
                    <div id="cabecalho-avaliacoes">
                        <div id="filtro-todas">Todas</div>
                        <div id="filtro-positivas">Positivas</div>
                        <div id="filtro-negativas">Negativas</div>
                    </div>
                    {
                        avaliacoes.map(elemento =>{
                            return (
                            <div key={elemento.id} className="avaliacao-individual">
                                <div className="avaliacao-geral" style={{padding: "5px"}}>
                                    <div className="avaliacao">
                                        <span className="titulo-nota">Didática</span>
                                        <div className="container-barra">
                                            <div className="barra-verde" style={{width: String(elemento.avaliacao.didatica*20)+"%"}}>{elemento.avaliacao.didatica}</div>
                                        </div>
                                    </div>
                                    <div className="avaliacao">
                                        <span className="titulo-nota">Disposição em tirar duvidas</span>
                                        <div className="container-barra">
                                            <div className="barra-verde" style={{width: String(elemento.avaliacao.tirarDuvidas*20)+"%"}}>{elemento.avaliacao.tirarDuvidas}</div>
                                        </div>
                                    </div>
                                    <div className="avaliacao">
                                        <span className="titulo-nota">Metodologia de avaliações</span>
                                        <div className="container-barra">
                                            <div className="barra-vermelha" style={{width: String(elemento.avaliacao.metodologia*20)+"%"}}>{elemento.avaliacao.metodologia}</div>
                                        </div>
                                    </div>
                                    <div className="avaliacao">
                                        <span className="titulo-nota">Coerência com conteúdo cobrado</span>
                                        <div className="container-barra">
                                            <div className="barra-verde" style={{width: String(elemento.avaliacao.conteudo*20)+"%"}}>{elemento.avaliacao.conteudo}</div>
                                        </div>
                                    </div>
                                    <div className="avaliacao">
                                        <span className="titulo-nota">Coerência na correção</span>
                                        <div className="container-barra">
                                            <div className="barra-verde" style={{width: String(elemento.avaliacao.correcao*20)+"%"}}>{elemento.avaliacao.correcao}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comentario-individual">
                                    <p>{elemento.comentario}</p>
                                    {elemento.materias.map((materia, index) => (
                                        <span key={index} style={{fontWeight:"bold"}}>{materia}<br /></span>
                                    ))}
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

Avaliacoes.propTypes = {
    universidade: PropTypes.string.isRequired,
    docente: PropTypes.string.isRequired,
}
  
export default Avaliacoes