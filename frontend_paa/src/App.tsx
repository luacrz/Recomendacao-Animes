import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tree from './pages/Tree';

import questions from '../questions';
import { useState } from 'react';

export default function App() {
  const [questoes, setQuestoes] = useState<string[]>(questions)

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home questions={questoes} />} />
          <Route path="/tree" element={<Tree questions={questoes} changeQuestions={setQuestoes} />} />
        </Routes>
      </div>
    </Router>
  );
}
