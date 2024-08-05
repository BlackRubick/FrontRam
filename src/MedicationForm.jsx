// MedicationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar axios
import './MedicationForm.css'; // Asegúrate de importar el archivo CSS

const MedicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    activity: '',
    volume: '',
    preparationDate: '',
    batchNumber: '',
    expirationDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatear fechas si es necesario
    const formattedData = {
      ...formData,
      preparationDate: new Date(formData.preparationDate).toISOString().slice(0, 19).replace('T', ' '),
      expirationDate: new Date(formData.expirationDate).toISOString().slice(0, 10)
    };

    try {
      const response = await axios.post('http://23.21.150.53:8000/medications/', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Medicamento registrado:', response.data);

      // Limpiar el formulario después de enviar
      setFormData({
        name: '',
        activity: '',
        volume: '',
        preparationDate: '',
        batchNumber: '',
        expirationDate: ''
      });

      // Redirigir a la vista /table
      navigate('/table');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      // Manejar el error
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Registrar Medicamento</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="activity">Actividad:</label>
            <input
              type="text"
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="volume">Volumen:</label>
            <input
              type="text"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="preparationDate">Fecha de Preparación:</label>
            <input
              type="datetime-local"
              id="preparationDate"
              name="preparationDate"
              value={formData.preparationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="batchNumber">Número de Lote:</label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expirationDate">Fecha de Expiración:</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registrar Medicamento</button>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;
