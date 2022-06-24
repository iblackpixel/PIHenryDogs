import React, { useState } from "react";

export default function Paginado(totalDogs, paginado) {
  const [pagina, setPagina] = useState();
  const handlePage = function (e) {
    const number = e.target.value;
    totalDogs.paginado(number);
    setPagina(number);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalDogs.totalDogs / 8); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <button
                key={number}
                value={number}
                onClick={(e) => handlePage(e)}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
