import {useState} from 'react';
import starRegular from '../assets/star-regular.svg'
import starSolid from '../assets/star-solid.svg'
import simImg from '../assets/sim.png'
import naoImg from '../assets/nao.png'

function FormAvaliacao({ universidade, docente }) {
  // Estado para controlar a seleção de estrelas
  const [estrelas, setEstrelas] = useState({
    didatica: 0,
    tirarDuvidas: 0,
    metodologia: 0,
    conteudo: 0,
    correcao: 0,
  });

  // Estado para controlar a seleção de "Sim" ou "Não"
  const [cobraPresenca, setCobraPresenca] = useState(null);

  // Função para lidar com o clique nas estrelas
  const handleEstrelaClick = (categoria, index) => {
    setEstrelas((prev) => ({
      ...prev,
      [categoria]: index + 1, // Atualiza o índice da estrela selecionada
    }));
  };

  // Função para renderizar as estrelas
  const renderEstrelas = (categoria, altText) => {
    return Array.from({ length: 5 }, (_, index) => (
      <img
        key={index}
        src={index < estrelas[categoria] ? starSolid : starRegular}
        className={index < estrelas[categoria] ? "amarela" : ''}
        alt={`estrela ${index + 1} ${altText}`}
        onClick={() => handleEstrelaClick(categoria, index)}
        style={{ cursor: 'pointer' }}
      />
    ));
  };

  // Função para renderizar as opções de "Sim" e "Não"
  const renderSimNao = () => {
    return (
      <div className="sim-nao-container">
        <img
          className={`sim-nao ${cobraPresenca === true ? 'verde' : ''}`}
          src={simImg}
          alt="Sim"
          onClick={() => setCobraPresenca(true)}
          style={{ cursor: 'pointer' }}
        />
        <img
          className={`sim-nao ${cobraPresenca === false ? 'verde' : ''}`}
          src={naoImg}
          alt="Não"
          onClick={() => setCobraPresenca(false)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    );
  };

  return (
    <div className="flexCentralizado" style={{ flexDirection: 'column' }}>
      <a style={{ padding: '20px', fontWeight: 'bold', fontSize: 'large' }}>
        Avaliando o professor {docente}
      </a>

      <div id="forms-avaliacao">
        {/* Linhas de avaliação */}
        {[
          { label: 'Didática', categoria: 'didatica', altText: 'didatica' },
          { label: 'Disposição em tirar dúvidas', categoria: 'tirarDuvidas', altText: 'tirar duvidas' },
          { label: 'Metodologia de avaliações', categoria: 'metodologia', altText: 'metodologia' },
          { label: 'Coerência com conteúdo cobrado', categoria: 'conteudo', altText: 'conteudo' },
          { label: 'Coerência na correção', categoria: 'correcao', altText: 'correcao' },
        ].map((item, index) => (
          <div key={index} className="linhaAvaliacao">
            <div>{item.label}</div>
            <div className="estrelas">{renderEstrelas(item.categoria, item.altText)}</div>
          </div>
        ))}

        {/* Linha de "Cobra presença?" */}
        <div className="linhaAvaliacao">
          <div>Cobra presença?</div>
          {renderSimNao()}
        </div>
      </div>

      {/* Campos de texto */}
      <div id="campos-escritos">
        <textarea
          name="comentario"
          id="comentario"
          placeholder="Avaliação do professor"
        ></textarea>
        <textarea
          name="add-disciplina"
          id="add-disciplina"
          placeholder="Adicionar disciplinas ao professor (1 por linha)"
        ></textarea>
      </div>

      {/* Botão de enviar */}
      <button
        type="button"
        className="custom-button"
        onClick={() => window.location.reload()} // Recarrega a página
      >
        Enviar
      </button>
    </div>
  );
}

export default FormAvaliacao;