import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateCustomer from './createCustomer';
import Dashboard from './dashboard';
import CafeDetail from './cafeDetail';
import SubjectDetail from './subjectDetail';
import GroupDetail from './groupDetail';
import CustomerDetail from './customerDetail'; // Import CustomerDetail component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateCustomer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cafes/:id" element={<CafeDetail />} />
          <Route path="/subjects/:id" element={<SubjectDetail />} />
          <Route path="/groups/:id" element={<GroupDetail />} />
          <Route path="/my-profile" element={<CustomerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
