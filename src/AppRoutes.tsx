import { Routes, Route } from 'react-router-dom';
import TracksPage from '@/pages/TracksPage/TracksPage';

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<TracksPage />} />
         <Route path="/tracks" element={<TracksPage />} />
      </Routes>
   );
}
