import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import StudyPage from './pages/StudyPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/flashcards" element={<StudyPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/quiz/:id" element={<QuizPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
