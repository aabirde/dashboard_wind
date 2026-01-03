// import React, { useState, useEffect } from 'react';
// import { getReports, createReport, getTurbines } from "../services/api";

// const ReportsComponent = () => {
//   const [reports, setReports] = useState([]);
//   const [turbines, setTurbines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch both reports and turbines on component mount
//   useEffect(() => {
//     const initData = async () => {
//       try {
//         setLoading(true);
//         const [reportsData, turbinesData] = await Promise.all([
//           getReports(),
//           getTurbines()
//         ]);
//         setReports(reportsData);
//         setTurbines(turbinesData);
//       } catch (err) {
//         console.error('Error initializing data:', err);
//         setError('Failed to load data. Please check your connection.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     initData();
//   }, []);

//   const handleCreateReport = async (turbine) => {
//     if (!turbine) {
//       alert("No turbine selected for the report.");
//       return;
//     }

//     try {
//       // Note: user_id is NOT included here because the backend 
//       // extracts it from the JWT Authorization header
//       const newReport = {
//         turbine_id: turbine.id,
//         title: `Maintenance Report for ${turbine.name || 'Unknown Turbine'}`,
//         content: `Turbine ${turbine.name || 'N/A'} (SN: ${turbine.serial_number || 'N/A'}) 
//                   currently has a power output of ${turbine.current_power_output || 0}kW 
//                   and efficiency of ${turbine.efficiency || 0}%.`,
//         report_type: 'performance',
//         priority: 'medium',
//         status: 'pending'
//       };
      
//       const createdReport = await createReport(newReport);
      
//       // Update local state to show the new report immediately
//       setReports(prev => [createdReport, ...prev]);
//       alert('Report created successfully!');
//     } catch (err) {
//       console.error('Error creating report:', err);
//       alert(`Failed to create report: ${err.response?.data?.error || err.message}`);
//     }
//   };

//   if (loading) return <div>Loading reports and turbines...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="reports-container">
//       <h2>Turbine Management</h2>
//       <div className="turbine-actions" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//         {turbines.map((turbine) => (
//           <button 
//             key={turbine.id} 
//             onClick={() => handleCreateReport(turbine)}
//             style={{ padding: '8px 12px', cursor: 'pointer' }}
//           >
//             Generate Report for {turbine.name}
//           </button>
//         ))}
//       </div>

//       <hr />

//       <h2>Existing Reports</h2>
//       {reports.length === 0 ? (
//         <p>No reports found.</p>
//       ) : (
//         <ul className="reports-list">
//           {reports.map((report) => (
//             <li key={report.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
//               <strong>{report.title}</strong> ({report.report_type})
//               <p>{report.content}</p>
//               <small>Status: {report.status} | Priority: {report.priority}</small>
//               <br />
//               <small>Date: {new Date(report.created_at).toLocaleString()}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ReportsComponent;

// import React, { useState, useEffect } from 'react';
// import { getReports, createReport, getTurbines } from "../services/api";
// import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';

// const ReportsComponent = () => {
//   const [reports, setReports] = useState([]);
//   const [turbines, setTurbines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const initData = async () => {
//       try {
//         setLoading(true);
//         const [reportsData, turbinesData] = await Promise.all([
//           getReports(),
//           getTurbines()
//         ]);
//         setReports(reportsData);
//         setTurbines(turbinesData);
//       } catch (err) {
//         console.error('Error initializing data:', err);
//         setError('Failed to load data. Please check your connection.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     initData();
//   }, []);

//   const handleCreateReport = async (turbine) => {
//     if (!turbine) {
//       alert("No turbine selected for the report.");
//       return;
//     }
//     try {
//       const newReport = {
//         turbine_id: turbine.id,
//         title: `Maintenance Report for ${turbine.name || 'Unknown Turbine'}`,
//         content: `Turbine ${turbine.name || 'N/A'} (SN: ${turbine.serial_number || 'N/A'}) 
//                   currently has a power output of ${turbine.current_power_output || 0}kW 
//                   and efficiency of ${turbine.efficiency || 0}%.`,
//         report_type: 'performance',
//         priority: 'medium',
//         status: 'pending'
//       };
//       const createdReport = await createReport(newReport);
//       setReports(prev => [createdReport, ...prev]);
//       alert('Report created successfully!');
//     } catch (err) {
//       console.error('Error creating report:', err);
//       alert(`Failed to create report: ${err.response?.data?.error || err.message}`);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-start align-items-center py-5">
//         <Spinner animation="border" variant="primary" size="sm" className="me-2" />
//         <span className="text-secondary fw-bold small text-uppercase tracking-wider">Loading system data...</span>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="py-4">
//         <Alert variant="danger" className="border-0 shadow-sm text-start">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="py-4 px-md-5">
//       {/* 1. Management Section - Anchored Left */}
//       <Row className="text-start mb-5">
//         <Col xs={12} lg={12} xl={12}>
//           <Card className="border-0 shadow-sm bg-primary">
//             <Card.Body className="p-4">
//               <Card.Title className="h5 mb-4 fw-bold text-uppercase tracking-wider text-black">
//                 Turbine Management
//               </Card.Title>
//               <div className="d-flex flex-wrap gap-2">
//                 {turbines.map((turbine) => (
//                   <Button 
//                     key={turbine.id} 
//                     variant="white" 
//                     size="sm"
//                     onClick={() => handleCreateReport(turbine)}
//                     className="fw-bold border shadow-sm hover-shadow-md transition-all"
//                   >
//                     + Generate: {turbine.name}
//                   </Button>
//                 ))}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* 2. Existing Reports Section - Constrained Width on the Left */}
//       <div className="text-start">
//         <h2 className="h4 mb-4 fw-bold text-uppercase tracking-tight">Existing Reports</h2>
        
//         {reports.length === 0 ? (
//           <Alert variant="info" className="d-inline-block border-0 shadow-sm">
//             No active reports found in registry.
//           </Alert>
//         ) : (
//           /* Removed xs={1} md={1} from Row to allow custom column sizing */
//           <Row className="g-4">
//             {reports.map((report) => (
//               /* Constraining the width to lg=8 or lg=6 keeps them strictly to the left */
//               <Col key={report.id} xs={12} md={12} lg={12} xl={12}>
//                 <Card className="border-0 shadow-sm h-100 bg-white">
//                   <Card.Body className="p-4">
//                     <div className="d-flex justify-content-between align-items-start mb-3">
//                       <div className="text-start">
//                         <Card.Title className="h5 fw-black mb-1">{report.title}</Card.Title>
//                         <Badge bg="light" text="secondary" className="text-uppercase border fw-bold px-2 py-1">
//                           {report.report_type}
//                         </Badge>
//                       </div>
//                       <div className="d-flex gap-2">
//                         <Badge bg={report.status === 'pending' ? 'warning' : 'success'} className="px-3 py-2 text-uppercase fw-black">
//                           {report.status}
//                         </Badge>
//                         <Badge bg="dark" className="px-3 py-2 text-uppercase fw-black">
//                           {report.priority}
//                         </Badge>
//                       </div>
//                     </div>
                    
//                     <Card.Text className="text-muted mt-3" style={{ lineHeight: '1.6' }}>
//                       {report.content}
//                     </Card.Text>
//                   </Card.Body>
//                   <Card.Footer className="bg-transparent border-0 text-secondary small pb-4 px-4 text-start">
//                     <span className="fw-bold text-uppercase" style={{ fontSize: '10px' }}>
//                       Logged On: {new Date(report.created_at).toLocaleString()}
//                     </span>
//                   </Card.Footer>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default ReportsComponent;

import React, { useState, useEffect } from 'react';
import { getReports, createReport, getTurbines } from "../services/api";
// 1. Import your Navbar component
import Newbar from './Navbar'; 
// Import React-Bootstrap components
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);
  const [turbines, setTurbines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [reportsData, turbinesData] = await Promise.all([
          getReports(),
          getTurbines()
        ]);
        setReports(reportsData);
        setTurbines(turbinesData);
      } catch (err) {
        console.error('Error initializing data:', err);
        setError('Failed to load data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleCreateReport = async (turbine) => {
    if (!turbine) {
      alert("No turbine selected for the report.");
      return;
    }
    try {
      const newReport = {
        turbine_id: turbine.id,
        title: `Maintenance Report for ${turbine.name || 'Unknown Turbine'}`,
        content: `Turbine ${turbine.name || 'N/A'} (SN: ${turbine.serial_number || 'N/A'}) 
                  currently has a power output of ${turbine.current_power_output || 0}kW 
                  and efficiency of ${turbine.efficiency || 0}%.`,
        report_type: 'performance',
        priority: 'medium',
        status: 'pending'
      };
      const createdReport = await createReport(newReport);
      setReports(prev => [createdReport, ...prev]);
      alert('Report created successfully!');
    } catch (err) {
      console.error('Error creating report:', err);
      alert(`Failed to create report: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column vh-100">
        <Newbar />
        <Container className="d-flex justify-content-start align-items-center flex-grow-1">
          <Spinner animation="border" variant="primary" size="sm" className="me-2" />
          <span className="text-secondary fw-bold small text-uppercase tracking-wider">Loading system data...</span>
        </Container>
      </div>
    );
  }

  return (
    // 2. Wrap everything in a flex-column container to include the Navbar
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Newbar />
      
      <Container fluid className="py-4 px-md-5 flex-grow-1">
        {error && (
          <Alert variant="danger" className="border-0 shadow-sm text-start mb-4">{error}</Alert>
        )}

        {/* 1. Management Section - Anchored Left */}
        <Row className="text-start mb-5">
          <Col xs={12}>
            <Card className="border-0 shadow-sm bg-purple text-white">
              <Card.Body className="p-4">
                <Card.Title className="h5 mb-4 fw-bold text-uppercase tracking-wider text-white">
                  Turbine Management
                </Card.Title>
                <div className="d-flex flex-wrap gap-2">
                  {turbines.map((turbine) => (
                    <Button 
                      key={turbine.id} 
                      variant="light" 
                      size="sm"
                      onClick={() => handleCreateReport(turbine)}
                      className="fw-bold border shadow-sm hover-shadow-md transition-all text-primary"
                    >
                      + Generate: {turbine.name}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 2. Existing Reports Section - Constrained Width on the Left */}
        <div className="text-start">
          <h2 className="h4 mb-4 fw-bold text-uppercase tracking-tight text-dark">Existing Reports</h2>
          
          {reports.length === 0 ? (
            <Alert variant="info" className="d-inline-block border-0 shadow-sm">
              No active reports found in registry.
            </Alert>
          ) : (
            <Row className="g-4">
              {reports.map((report) => (
                <Col key={report.id} xs={12}>
                  <Card className="border-0 shadow-sm h-100 bg-primary">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="text-start">
                          <Card.Title className="h5 fw-bold mb-1 text-dark">{report.title}</Card.Title>
                          <Badge bg="light" text="secondary" className="text-uppercase border fw-bold px-2 py-1">
                            {report.report_type}
                          </Badge>
                        </div>
                        <div className="d-flex gap-2">
                          <Badge bg={report.status === 'pending' ? 'warning' : 'success'} className="px-3 py-2 text-uppercase fw-bold text-dark">
                            {report.status}
                          </Badge>
                          <Badge bg="dark" className="px-3 py-2 text-uppercase fw-bold">
                            {report.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <Card.Text className="text-muted mt-3" style={{ lineHeight: '1.6' }}>
                        {report.content}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 text-secondary small pb-4 px-4 text-start">
                      <span className="fw-bold text-uppercase" style={{ fontSize: '10px' }}>
                        Logged On: {new Date(report.created_at).toLocaleString()}
                      </span>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ReportsComponent;