import { useState, useEffect } from "react";

function HistoricoAvaliacoes() {
  const [isOpen, setIsOpen] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState([]);

  // Recupera as avaliações do localStorage quando o componente monta
  useEffect(() => {
    const historicoAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    setAvaliacoes(historicoAvaliacoes);
  }, []);

  const handleBtnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="historico-button" onClick={handleBtnClick} style={{position: "fixed", top: "10px", right: "10px", zIndex:"1000"}}>☰</button>
      <div className="paiHistorico">
        {isOpen && (
            avaliacoes.map((elemento) => {
                return<div key={elemento.nome} className="historico-element"
                    style={{}}>
                        <div style={{display: "flex"}}>
                            <div className="filhoHistorico">
                                <p>Nome: {elemento.nome}</p>
                                <p>Universidade: {elemento.universidade}</p>
                                <p>Cobra presença? {elemento.presenca ? "SIM" : "NÃO"}</p>
                                <p>Didática: {elemento.avaliacao.didatica}</p>
                                <p>Disposição em tirar duvidas: {elemento.avaliacao.tirarDuvidas}</p>
                                <p>Metodologia de avaliações: {elemento.avaliacao.metodologia}</p>
                                <p>Coerência com conteúdo cobrado: {elemento.avaliacao.conteudo}</p>
                                <p>Coerência na correção: {elemento.avaliacao.correcao}</p>
                                <div style={{borderColor: "black", borderWidth: "2px", borderStyle: "solid", margin: "1px", padding:"1px"}}>
                                    <p>Matérias:</p>
                                    <p>{elemento.materias.map(materia => {return <p key={materia}>{materia}</p>})}</p>
                                </div>
                            </div>
                            <div className="filhoHistorico">
                                Comentario:
                                <p>{elemento.comentario}</p>
                            </div>
                        </div>
                    </div>
            })
        )}
        </div>
    </div>
  );
}
export default HistoricoAvaliacoes;