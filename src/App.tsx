import { FC } from 'react';

import { Provider } from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: FC = () => (
  <>
    <GlobalStyle />
    
    <Provider>
      <Routes />
    </Provider>
  </>
);

export default App;
