import { render } from 'react-dom';
import { Provider } from 'react-redux';
//
import DebounceExample from './DebounceExample';
import { store } from './store';
import './styles.css';

render(
  <Provider store={store}>
    <div className='App'>
      <DebounceExample />
    </div>
  </Provider>,
  document.getElementById('root')
);
