import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { EmployeeProvider } from './context/EmployeeContext';
import Navigator from './navigator/Navigator';

function App() {
    return (
      <Router>
        <AuthProvider>
          <AdminProvider>
            <EmployeeProvider>
              <Navigator />
            </EmployeeProvider>
          </AdminProvider>
        </AuthProvider>
      </Router>
    );
}

export default App;