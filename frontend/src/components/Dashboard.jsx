// import React, { useState, useEffect } from 'react';
// import TurbineCard from './TurbineCard';
// import LineChart from './LineChart';
// import { getTurbines } from '../services/api';

// const Dashboard = () => {
//   const [turbines, setTurbines] = useState([]);
//   const [selectedTurbineId, setSelectedTurbineId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [inputId, setInputId] = useState(""); // State for the input field
//   const [visibleStats, setVisibleStats] = useState({
//     current_power_output: true,
//     wind_speed: true,
//     temperature: true,
//     vibration_level: true,
//   });

//   useEffect(() => {
//     const fetchTurbines = async () => {
//       const data = await getTurbines();
//       setTurbines(data);
//       setLoading(false);
//     };
//     fetchTurbines();
//   }, []);

//   const selectedTurbine = turbines.find(t => String(t.id) === String(selectedTurbineId));

//   const handleSearch = (e) => {
//     if (e) e.preventDefault();
//     // Check if the ID exists in the fetched list
//     const exists = turbines.some(t => String(t.id) === String(inputId));
//     if (exists) {
//       setSelectedTurbineId(inputId);
//       setInputId(""); // Clear input after search
//     } else {
//       alert("Turbine ID not found in fleet.");
//     }
//   };

//   const handleStatToggle = (stat) => {
//     setVisibleStats(prev => ({ ...prev, [stat]: !prev[stat] }));
//   };

//   if (loading) return <div className="p-10 text-slate-500 animate-pulse uppercase tracking-widest font-black">Initialising Systems...</div>;

//   return (
//     <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-white">
      
//       {/* 1. Header & Search Input Section */}
//       <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-slate-800 pb-8">
//         <div>
//           <h2 className="text-3xl font-black uppercase tracking-tighter">
//             {selectedTurbine ? `Diagnostics: ${selectedTurbine.name}` : "Fleet Overview"}
//           </h2>
//           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
//             {selectedTurbine ? `Serial: ${selectedTurbine.serial_number}` : "System-wide performance monitor"}
//           </p>
//         </div>

//         <div className="flex flex-wrap items-center gap-4">
//           {/* --- TURBINE ID INPUT FIELD --- */}
//           <form onSubmit={handleSearch} className="flex items-center">
//             <input 
//               type="text"
//               placeholder="Enter Turbine ID (e.g. 1)"
//               value={inputId}
//               onChange={(e) => setInputId(e.target.value)}
//               className="bg-[#000022] border border-slate-700 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 transition-all"
//             />
//             <button 
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-[10px] font-black uppercase tracking-widest transition-all"
//             >
//               Fetch
//             </button>
//           </form>

//           {selectedTurbineId && (
//             <button 
//               onClick={() => setSelectedTurbineId(null)}
//               className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
//             >
//               ← Back to Fleet
//             </button>
//           )}
//         </div>
//       </div>

//       {/* 2. Conditional View Logic */}
//       {!selectedTurbineId ? (
//         <>
//           {/* Customization Bar */}
//           <div className="bg-[#000022] p-4 rounded-xl border border-slate-800 flex items-center gap-6">
//             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Toggle Metrics:</span>
//             <div className="flex gap-4">
//               {Object.keys(visibleStats).map(stat => (
//                 <label key={stat} className="flex items-center cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={visibleStats[stat]}
//                     onChange={() => handleStatToggle(stat)}
//                     className="hidden"
//                   />
//                   <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border transition-all ${visibleStats[stat] ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-800 text-slate-600 group-hover:border-slate-600'}`}>
//                     {stat.replace(/_/g, ' ')}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Fleet Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {turbines.map(turbine => (
//               <div key={turbine.id} onClick={() => setSelectedTurbineId(turbine.id)} className="cursor-pointer group">
//                 <TurbineCard turbine={turbine} visibleStats={visibleStats} />
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         /* 3. Merged Diagnostics View */
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-[#000022] p-8 rounded-2xl border border-slate-800 shadow-2xl">
//               <div className="flex justify-between items-center mb-8">
//                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Power Generation Trend (24h)</h3>
//                 <div className="flex gap-2 items-center">
//                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
//                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Live Sync: ID {selectedTurbine.id}</span>
//                 </div>
//               </div>
//               <div className="h-80">
//                 <LineChart turbineId={selectedTurbineId} />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-[#000022] p-6 rounded-2xl border border-slate-800">
//               <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Live Parameters</h3>
//               <div className="space-y-4">
//                  {[
//                    { label: 'Temperature:', value: `${selectedTurbine.temperature}°C` },
//                    { label: 'Vibration:', value: `${selectedTurbine.vibration_level} Hz` },
//                    { label: 'Wind Speed:', value: `${selectedTurbine.wind_speed} m/s` }
//                  ].map(item => (
//                    <div key={item.label} className="flex justify-between border-b border-slate-800 pb-2">
//                       <span className="text-[11px] text-slate-400 uppercase font-bold">{item.label}</span>
//                       <span className="text-sm font-black text-white">{item.value}</span>
//                    </div>
//                  ))}
//               </div>
//             </div>

// <div className={`p-6 rounded-2xl border transition-all ${
//     selectedTurbine.status === 'operational' 
//       ? 'bg-emerald-500/5 border-emerald-500/20' 
//       : 'bg-red-500/5 border-red-500/20'
//   }`}>
//     <div className="flex items-center justify-between mb-4">
//       <h3 className={`text-[10px] font-black uppercase tracking-widest ${
//         selectedTurbine.status === 'operational' ? 'text-emerald-500' : 'text-red-500'
//       }`}>
//         Service Status
//       </h3>
//       <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
//         selectedTurbine.status === 'operational' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
//       }`}>
//         {selectedTurbine.status}
//       </span>
//     </div>

//     <div className="space-y-3">
//       <div>
//         <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Last Database Update: </span>
//         <span className="text-xs text-white font-mono">
//           {/* Formats the date from your DB. Fallback to 'N/A' if null */}
//           {selectedTurbine.last_maintenance 
//             ? new Date(selectedTurbine.last_maintenance).toLocaleDateString('en-GB') 
//             : "No record found"}
//         </span>
//       </div>
      
//       <p className="text-[11px] text-slate-400 leading-relaxed">
//         System integrity is synchronized with the central asset registry. Manual override is required for state changes.
//       </p>
//     </div>
//   </div>
// </div>
// </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, InputGroup, Spinner } from 'react-bootstrap';
import TurbineCard from './TurbineCard';
import LineChart from './LineChart';
import { getTurbines } from '../services/api';

const Dashboard = () => {
  const [turbines, setTurbines] = useState([]);
  const [selectedTurbineId, setSelectedTurbineId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputId, setInputId] = useState("");
  const [visibleStats, setVisibleStats] = useState({
    current_power_output: true,
    wind_speed: true,
    temperature: true,
    vibration_level: true,
  });

  useEffect(() => {
    const fetchTurbines = async () => {
      const data = await getTurbines();
      setTurbines(data);
      setLoading(false);
    };
    fetchTurbines();
  }, []);

  const selectedTurbine = turbines.find(t => String(t.id) === String(selectedTurbineId));

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const exists = turbines.some(t => String(t.id) === String(inputId));
    if (exists) {
      setSelectedTurbineId(inputId);
      setInputId("");
    } else {
      alert("Turbine ID not found in fleet.");
    }
  };

  const handleStatToggle = (stat) => {
    setVisibleStats(prev => ({ ...prev, [stat]: !prev[stat] }));
  };

  // Custom styling for the "Dark Dashboard" look
  const darkNavy = "#000022";
  const slate950 = "#020617";

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-secondary">
        <Spinner animation="border" size="sm" className="me-2" />
        <span className="text-uppercase fw-bold tracking-widest">Initialising Systems...</span>
      </div>
    );
  }

  return (
    <div className="p-4 p-md-5 min-vh-100 text-white" style={{ backgroundColor: slate950 }}>
      
      {/* 1. Header & Search Section */}
      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center gap-4 mb-5 pb-4 border-bottom border-secondary">
        <div>
          <h2 className="display-6 fw-black text-uppercase mb-0">
            {selectedTurbine ? `Diagnostics: ${selectedTurbine.name}` : "Fleet Overview"}
          </h2>
          <p className="text-secondary small fw-bold text-uppercase tracking-widest mt-1">
            {selectedTurbine ? `Serial: ${selectedTurbine.serial_number}` : "System-wide performance monitor"}
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-3">
          <Form onSubmit={handleSearch}>
            <InputGroup size="sm">
              <Form.Control
                placeholder="Enter Turbine ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                style={{ backgroundColor: darkNavy, color: 'white', border: '1px solid #334155' }}
              />
              <Button variant="primary" type="submit" className="text-uppercase fw-bold px-3">
                Fetch
              </Button>
            </InputGroup>
          </Form>

          {selectedTurbineId && (
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={() => setSelectedTurbineId(null)}
              className="text-uppercase fw-bold text-white"
            >
              ← Back to Fleet
            </Button>
          )}
        </div>
      </div>

      {!selectedTurbineId ? (
        <>
          {/* Customization Bar */}
          <Card className="border-secondary mb-4" style={{ backgroundColor: darkNavy }}>
            <Card.Body className="d-flex align-items-center gap-4 py-3">
              <span className="small fw-bold text-secondary text-uppercase tracking-widest">Toggle Metrics:</span>
              <div className="d-flex gap-2">
                {Object.keys(visibleStats).map(stat => (
                  <Button
                    key={stat}
                    size="sm"
                    variant={visibleStats[stat] ? "primary" : "outline-secondary"}
                    onClick={() => handleStatToggle(stat)}
                    className="text-uppercase fw-bold small py-1 px-3"
                    style={{ fontSize: '10px' }}
                  >
                    {stat.replace(/_/g, ' ')}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Fleet Grid */}
          <Row className="g-4">
            {turbines.map(turbine => (
              <Col key={turbine.id} xs={12} md={6} lg={4}>
                <div onClick={() => setSelectedTurbineId(turbine.id)} style={{ cursor: 'pointer' }}>
                  <TurbineCard turbine={turbine} visibleStats={visibleStats} />
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        /* 3. Diagnostics View */
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-secondary rounded-4 p-4 shadow-lg" style={{ backgroundColor: darkNavy }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h6 fw-bold text-uppercase text-secondary mb-0">Power Generation Trend (24h)</h3>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                  <span className="small fw-bold text-primary text-uppercase">Live Sync: ID {selectedTurbine.id}</span>
                </div>
              </div>
              <div style={{ height: '350px' }}>
                <LineChart turbineId={selectedTurbineId} />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="d-flex flex-column gap-4">
              {/* Parameters Card */}
              <Card className="border-secondary rounded-4 p-4" style={{ backgroundColor: darkNavy }}>
                <h3 className="small fw-bold text-uppercase text-white mb-4">Live Parameters</h3>
                <div className="d-flex flex-column gap-3">
                  {[
                    { label: 'Temperature:', value: `${selectedTurbine.temperature}°C` },
                    { label: 'Vibration:', value: `${selectedTurbine.vibration_level} Hz` },
                    { label: 'Wind Speed:', value: `${selectedTurbine.wind_speed} m/s` }
                  ].map(item => (
                    <div key={item.label} className="d-flex justify-content-between border-bottom border-secondary pb-2">
                      <span className="small text-white text-uppercase fw-bold">{item.label}</span>
                      <span className="fw-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Status Card */}
              <Card className={`border-0 rounded-4 p-4 ${selectedTurbine.status === 'operational' ? 'bg-success' : 'bg-danger'} bg-opacity-10`}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className={`small fw-bold text-uppercase mb-0 ${selectedTurbine.status === 'operational' ? 'text-success' : 'text-danger'}`}>
                    Service Status
                  </h3>
                  <Badge bg={selectedTurbine.status === 'operational' ? 'success' : 'danger'} className="text-uppercase fw-bold">
                    {selectedTurbine.status}
                  </Badge>
                </div>
                <div className="mb-3">
                  <span className="d-block small text-secondary text-uppercase fw-bold mb-1">Last Database Update:</span>
                  <span className="fw-mono small">
                    {selectedTurbine.last_maintenance 
                      ? new Date(selectedTurbine.last_maintenance).toLocaleDateString('en-GB') 
                      : "No record found"}
                  </span>
                </div>
                <p className="small text-secondary mb-0">
                  System integrity is synchronized with central asset registry.
                </p>
              </Card>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;