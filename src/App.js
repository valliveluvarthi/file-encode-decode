
// components
import ThemeProvider from './theme';
import Router from './routes';
import { ThemeSettings } from './components/settings';


// ----------------------------------------------------------------------

export default function App() {
  return (
   
      <ThemeProvider>
        <ThemeSettings>
         
            <Router />
         
        </ThemeSettings>
      </ThemeProvider>
   
  );
}
