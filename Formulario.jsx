import React, { useState, useEffect } from 'react';
import { formatISO, isValid } from 'date-fns'; // Importar formatISO y validar fecha
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario = ({ onAddTurn, editTurn, onEditConfirm }) => {
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');

  const specialties = [
    'Gastroenterologia', 'Cardiologia', 'Dermatologia', 'Clinica Medica', 'Oftalmologia', 'Traumatologia',
  ];

  const doctorsBySpecialty = {
    'Gastroenterologia': ['Dr. Aguilar Marcelo', 'Dr. Hugo Ibañez'],
    'Cardiologia': ['Dr. Eduardo Pino', 'Dra. Susana Pan'],
    'Dermatologia': ['Claudia Zamora', 'Jessica Vazquez'],
    'Clinica Medica': ['Elisa Vialas', 'Enrique Pata'],
    'Oftalmologia': ['Juan Pablo Hache', 'Maria Laura Wix'],
    'Traumatologia': ['Patricio Paff', 'Julian Air'],
  };

  useEffect(() => {
    if (editTurn) {
      setSpecialty(editTurn.specialty || '');
      setDoctor(editTurn.doctor || '');
      setPatientName(editTurn.patientName || '');
      setDate(editTurn.date || '');
    }
  }, [editTurn]);

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
    setDoctor(''); // Limpiar médico si cambia la especialidad
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!specialty || !doctor || !patientName || !date) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Validar formato de fecha
    const parsedDate = new Date(date);
    if (!isValid(parsedDate)) {
      alert('La fecha ingresada no es válida.');
      return;
    }

    // Convertir la fecha al formato ISO 8601 (solo fecha)
    const formattedDate = formatISO(parsedDate, { representation: 'date' });

    // Crear el objeto de turno
    const turno = {
      id: editTurn?.id,
      specialty,
      doctor,
      patientName,
      date: formattedDate, // Se guarda solo la fecha sin hora
    };

    if (editTurn) {
      onEditConfirm(turno);
    } else {
      onAddTurn(turno);
    }

    alert('¡Turno generado correctamente!');
    
    // Limpiar el formulario
    setSpecialty('');
    setDoctor('');
    setPatientName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Especialidad</label>
        <select value={specialty} onChange={handleSpecialtyChange} className="form-control">
          <option value="">Seleccione</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Médico</label>
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="form-control">
          <option value="">Seleccione</option>
          {(doctorsBySpecialty[specialty] || []).map((doc) => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Fecha</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" />
      </div>

      <div className="form-group">
        <label>Nombre y Apellido</label>
        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="form-control" />
      </div>

      <br />
      <button type="submit" className="btn btn-primary">
        {editTurn ? 'Aceptar' : 'Agregar'}
      </button>
    </form>
  );
};

export default Formulario;
