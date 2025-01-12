import React from "react";

const Location = ({
  row,
  col,
  setSelectedCell,
  selectedCell,
}: {
  row: number;
  col: number;
  setSelectedCell: (cell: { col: number; row: number }) => void;
  selectedCell: { col: number; row: number } | null;
}) => {
  const obtenerValorSeleccionado = (col: number, row: number) => {
    setSelectedCell({ col, row });
  };

  return (
    <div className="flex flex-col gap-2 flex-nowrap w-[90%] mx-auto my-5">
      {Array.from({ length: row }).map((_, rowIndex) => (
        <div className="flex gap-2 flex-wrap" key={rowIndex}>
          {Array.from({ length: col }).map((_, colIndex) => (
            <div
              onClick={() => obtenerValorSeleccionado(colIndex, rowIndex)}
              className={`cell p-2 border border-[#ccc] cursor-pointer ${
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                  ? "bg-primary"
                  : "bg-[#c2c2c2]"
              } w-[40px] h-[20px] mx-auto`}
              key={colIndex}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Location;
