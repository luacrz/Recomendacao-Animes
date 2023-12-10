import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tree from './pages/Tree';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/outra">Outra Página</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" component={Home} />
        <Route path="/outra" component={Tree} />
      </div>
    </Router>
  );
}