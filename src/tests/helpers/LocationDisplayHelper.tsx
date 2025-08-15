import { useLocation } from 'react-router-dom';

export default function LocationDisplayHelper() {
   const location = useLocation();
   return <div data-testid="location">{location.search}</div>;
}
