import React from "react";
import { useParams } from "react-router-dom";

const Board: React.FC<{}> = ({}) => {
  const { classId } = useParams();

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <h1 className="text-center">Tablero {classId}</h1>
    </div>
  );
};

export default Board;
