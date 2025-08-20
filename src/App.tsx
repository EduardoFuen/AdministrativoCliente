// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';

// auth provider
import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
import { FilterProvider } from 'contexts/Filter.context';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <RTLLayout>
      <Locales>
        <ScrollTop>
          <AuthProvider>
            <FilterProvider>
            <>
              <Routes />
              <Snackbar />
            </>
            </FilterProvider>
          </AuthProvider>
        </ScrollTop>
      </Locales>
    </RTLLayout>
  </ThemeCustomization>
);

export default App;
