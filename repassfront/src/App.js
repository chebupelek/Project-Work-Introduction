import { Provider } from 'react-redux';

import store from './store/store';

import Base from './models/base/base';

function App() {
  return (
    <Provider store={store}>
      <Base></Base>
    </Provider>
  );
}

export default App;