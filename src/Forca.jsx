/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
// src/Forca.js
import React, { useState, useEffect, useCallback } from "react";
import { Drawing } from "./componentes/drawing";

const Forca = () => {
  const palavra = "GISELE SENNA DE OLIVEIRA"; // Palavra a ser adivinhada
  const [letra, setLetra] = useState("");
  const [letraRestante, setLetraRestante] = useState("");
  const [erros, setErros] = useState(0); // Número de tentativas restantes
  const [letrasDescobertas, setLetrasDescobertas] = useState([]); // Letras adivinhadas corretamente
  const [tentativas, setTentativas] = useState([]); //

  const [disabled, setDisabled] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [endGameFeedback, setEndGameFeedback] = useState({
    status: "loser",
    title: "Não foi dessa vez!",
    subtitle: "Quem sabe em uma outra oportunidade?",
  });

  const pegarLetrasRestantes = useCallback(() => {
    const letraRestantes = palavra
      .split("")
      .filter((letra) => !letrasDescobertas.includes(letra));

    setLetraRestante(letraRestantes);
  });

  function removeDuplicates(word) {
    let uniqueChars = [];
    for (let char of word.split(" ").join("")) {
      if (!uniqueChars.includes(char)) {
        uniqueChars.push(char);
      }
    }
    return uniqueChars.join("");
  }

  const tentarLetra = (letra) => {
    // Verificar se a letra está na palavra
    if (palavra.includes(letra)) {
      setLetrasDescobertas((prevState) => {
        return prevState.concat(letra);
      });
    } else {
      const quantidadeErro = erros + 1;
      setErros(quantidadeErro);
      setTentativas((prevState) => prevState.concat(letra));
    }
    setLetra("");
  };

  const renderPalavra = () => {
    return palavra.split("").map((letra, index) => (
      <span
        key={index}
        className={
          removeDuplicates(palavra).length === letrasDescobertas.length &&
          endGame
            ? "wins"
            : letraRestante.includes(letra) && endGame
            ? "loser"
            : "wins"
        }
      >
        {letrasDescobertas.includes(letra)
          ? letra
          : endGame && letraRestante.includes(letra)
          ? letra
          : letra === " "
          ? " "
          : "_"}
      </span>
    ));
  };
  const renderTentativa = () => {
    return tentativas.map((letra, index) => (
      <span key={index} className="letra">
        {index > 0 ? "-" + letra : letra}
      </span>
    ));
  };

  useEffect(() => {
    if (removeDuplicates(palavra).length === letrasDescobertas.length) {
      setEndGame(true);
      setEndGameFeedback({
        status: "wins",
        title: "Você conseguiu!",
        subtitle: "Mandou muito bem",
      });
    }

    if (erros === 4) {
      setDisabled(true);
      setEndGame(true);
      pegarLetrasRestantes();
    }
  }, [letrasDescobertas, erros]);

  return (
    <div className="forca">
      <h1>Jogo da Forca</h1>

      <div className="flex">
        <div className="col-1">
          <Drawing erros={erros} />
        </div>

        <div className="col">
          <div className="palavra">{renderPalavra()}</div>
          {!endGame ? (
            <>
              <input
                type="text"
                style={{ textTransform: "uppercase" }}
                maxLength={1}
                value={letra}
                onChange={(e) => setLetra(e.target.value)}
                disabled={disabled}
              />
              <button
                onClick={() => tentarLetra(letra.toUpperCase())}
                disabled={disabled}
              >
                Arriscar
              </button>
              <div className="tentativas">
                <h3>Letras Tentadas</h3>
                <div>{renderTentativa()}</div>
              </div>
            </>
          ) : (
            <div className={endGameFeedback.status + " feedback"}>
              <h3>{endGameFeedback.title}</h3>
              <p>{endGameFeedback.subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forca;
