import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const formatFecha = (fecha) => {
  const date = new Date(fecha); 
  return date.toLocaleDateString('es-AR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
const Tabla = ({ turns, onEditTurn, onDeleteTurn }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Nombre y Apellido</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turns.map((turn) => (
          <tr key={turn.id}>
            <td>{turn.specialty}</td>
            <td>{turn.doctor}</td>
            <td>{turn.patientName}</td>
            <td>{formatFecha(turn.date)}</td>
            <td>
              <button 
                onClick={() => onEditTurn(turn)} 
                className="btn btn-sm btn-warning"
              >
                Editar
              </button>
              <button 
                onClick={() => onDeleteTurn(turn.id)} 
                className="btn btn-sm btn-danger"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;