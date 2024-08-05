import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './MedicationList.css';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Fetch data from the API
    const fetchMedications = async () => {
      try {
        const response = await fetch('http://localhost:8000/medications/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMedications(data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  // Función para manejar la navegación
  const handleAddMedication = () => {
    navigate('/registro'); // Redirige a la vista /registro
  };

  return (
    <div className="list-container">
      <h2>Lista de Medicamentos</h2>
      <button className="add-button" onClick={handleAddMedication}>
        Agregar Medicamento
      </button>
      <table className="medication-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Actividad</th>
            <th>Volumen</th>
            <th>Preparación</th>
            <th>Número de Lote</th>
            <th>Caducidad</th>
          </tr>
        </thead>
        <tbody>
          {medications.length > 0 ? (
            medications.map((med, index) => (
              <tr key={index}>
                <td>{med.name}</td>
                <td>{med.activity}</td>
                <td>{med.volume}</td>
                <td>{new Date(med.preparation_date).toLocaleString()}</td>
                <td>{med.batch_number}</td>
                <td>{new Date(med.expiration_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay medicamentos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationList;
