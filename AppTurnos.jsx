import Formulario from './Formulario';
import Tabla from './Tabla';
import './estilos.css'; 
import logo from './Turnos.png';
import React, { useState } from 'react';

const AppTurnos = () => {
  const [turns, setTurns] = useState([]);
  const [editTurn, setEditTurn] = useState(null);

  const addTurn = (formValues) => {
    const newTurn = {
      id: Date.now(),
      specialty: formValues.specialty,
      doctor: formValues.doctor,
      patientName: formValues.patientName,
      date: new Date(formValues.date).toISOString(),
    };

    setTurns([...turns, newTurn]);
  };

  const editTurnHandler = (turn) => {
    setEditTurn(turn);
  };

  const editConfirmHandler = (updatedTurn) => {
    setTurns(turns.map((turn) => (turn.id === updatedTurn.id ? updatedTurn : turn))); 
    setEditTurn(null);
  };

  const deleteTurnHandler = (id) => {
    setTurns(turns.filter((turn) => turn.id !== id));
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Logo de la clínica" className="logo" />
      </div>
      <Formulario 
        onAddTurn={addTurn} 
        editTurn={editTurn} 
        onEditConfirm={editConfirmHandler} 
      />
      <div className="table-container">
        <Tabla
          turns={turns} 
          onEditTurn={editTurnHandler} 
          onDeleteTurn={deleteTurnHandler} 
        />
      </div>
    </div>
  );
};

export default AppTurnos;
