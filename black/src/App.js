import React, { useState } from 'react';
import LineChart from './graficas/LineChart';
import './css/bootstrap.min.css';
import Pie from './Cabeceraypie/Pie';

function App() {
  const colors = ['#3b82f6', '#ef4444', '#34d399', '#fbbf24', '#8b5cf6', '#ec4899'];
  const color3 = ['#60a5fa', '#fca5a5', '#6ee7b7', '#fde68a', '#c4b5fd', '#fbbfbc']; // Colores más claros

  const [formData, setFormData] = useState({
    host: '',
    user: '',
    pass: '',
    db: ''
  });
  const [tablas, setTablas] = useState([]);
  const [tablasSeleccionadas, setTablasSeleccionadas] = useState([]);
  const [columnas, setColumnas] = useState({});
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState({});
  const [datos, setDatos] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/tablas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Tablas obtenidas:', data);
        if (data.error) {
          setError(data.error);
          setTablas([]);
          setDatos({});
        } else {
          setTablas(data.tablas);
          setError('');
        }
      })
      .catch(err => {
        console.error('Error al obtener tablas:', err);
        setError('No se puede cargar las tablas');
        setTablas([]);
        setDatos({});
      });
  };

  const handleTableSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTablasSeleccionadas([...tablasSeleccionadas, value]);
      fetchColumnas(value);
    } else {
      setTablasSeleccionadas(tablasSeleccionadas.filter(tabla => tabla !== value));
      setColumnas((prevState) => {
        const newState = { ...prevState };
        delete newState[value];
        return newState;
      });
    }
  };

  const fetchColumnas = (tabla) => {
    const requestBody = {
      ...formData,
      tabla
    };
    fetch('http://localhost/columnas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Columnas obtenidas:', data);
        if (data.error) {
          setError(data.error);
        } else {
          setColumnas((prevState) => ({
            ...prevState,
            [tabla]: data.columnas
          }));
        }
      })
      .catch(err => {
        console.error('Error al obtener columnas:', err);
        setError('No se pueden cargar las columnas');
      });
  };

  const handleColumnSelect = (tabla, columna, axis, checked) => {
    setColumnasSeleccionadas((prevState) => {
      const newState = { ...prevState };
      if (!newState[tabla]) {
        newState[tabla] = {};
      }
      newState[tabla][axis] = checked ? columna : undefined; // Set X or Y based on axis
      return newState;
    });
  };

  const handleGetData = () => {
    console.log('Datos enviados para obtener datos:', {
      ...formData,
      tablas: tablasSeleccionadas,
      columnasSeleccionadas
    });

    fetch('http://localhost/datos_seleccionados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        tablas: tablasSeleccionadas,
        columnasSeleccionadas
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        if (data.error) {
          setError(data.error);
          setDatos({});
        } else {
          setDatos(data);
          setError('');
        }
      })
      .catch(err => {
        console.error('Error al obtener datos:', err);
        setError('No se pueden cargar los datos');
        setDatos({});
      });
  };

  const transformData = (data) => {
    return data.map(item => {
      return {
        x: item.fecha ? new Date(item.fecha) : parseFloat(item.id), // Si hay fecha, usar Date, si no, un número
        y: parseFloat(item.valor)
      };
    });
  };

  const renderCharts = () => {
    if (!datos || !Object.keys(datos).length) return null;

    return (
      <>
        {Object.keys(datos).map((tabla, index) => (
          <div className="col-md-6 tope" key={tabla}>
            <br />
            <h1 className="text-center">{tabla}</h1>
            <LineChart datos={transformData(datos[tabla])} color={colors[index % colors.length]} color3={color3[index % color3.length]}/>
            {/* Usando el color correspondiente del array, alternando entre colores */}
          </div>
        ))}
      </>
    );
  };

  const renderColumnSelection = (tabla) => {
    if (!columnas[tabla]) return null;

    return (
      <div className="ml-3">
        <h5>Seleccionar columnas para {tabla}:</h5>
        <div>
          <h6>Eje X:</h6>
          {columnas[tabla].map(columna => (
            <div key={columna} className="d-flex align-items-center mb-2">
              <input
                type="checkbox"
                onChange={(e) => handleColumnSelect(tabla, columna, 'x', e.target.checked)}
              />
              <span className="ml-2">{columna}</span>
            </div>
          ))}
        </div>
        <div>
          <h6>Eje Y:</h6>
          {columnas[tabla].map(columna => (
            <div key={columna} className="d-flex align-items-center mb-2">
              <input
                type="checkbox"
                onChange={(e) => handleColumnSelect(tabla, columna, 'y', e.target.checked)}
              />
              <span className="ml-2">{columna}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <br />
        <h1 className="text-center">Conectar a Base de Datos</h1>
        <br />
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Host:</label>
            <input type="text" className="form-control" name="host" value={formData.host} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>User:</label>
            <input type="text" className="form-control" name="user" value={formData.user} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" name="pass" value={formData.pass} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Database:</label>
            <input type="text" className="form-control" name="db" value={formData.db} onChange={handleChange} />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Obtener Tablas</button>
        </form>
        <hr />
        {tablas.length > 0 && (
          <>
            <h3>Selecciona las tablas y sus columnas para graficar:</h3>
            {tablas.map(tabla => (
              <div key={tabla} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={tabla}
                  onChange={handleTableSelect}
                />
                <label className="form-check-label">{tabla}</label>
                {tablasSeleccionadas.includes(tabla) && renderColumnSelection(tabla)}
              </div>
            ))}
            <button className="btn btn-secondary mt-3" onClick={handleGetData}>Obtener Datos</button>
          </>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="row mt-4">
          {renderCharts()}
        </div>
      </div>
    </div>
  );
}

export default App;
