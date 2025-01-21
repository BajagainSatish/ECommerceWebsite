import { Outlet } from 'react-router-dom';
import { BrandProvider } from './BrandContext';  // Import BrandProvider
import { CategoryProvider } from './CategoryContext';  // Import CategoryProvider

const App = () => {
  return (
    <CategoryProvider>  {/* Wrap Outlet with CategoryProvider */}
      <BrandProvider>  {/* Wrap Outlet with BrandProvider */}
        <Outlet />  {/* This will render the current route content */}
      </BrandProvider>
    </CategoryProvider>
  );
};

export default App;
