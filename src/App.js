import Modal from './components/Modal/Modal';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (<><button onClick={() => setShowModal(!showModal)}>Click Me!</button>
    <div id="parent" style={{ height: '400px', width: '50%', backgroundColor: 'lightslategray', margin: '200px 0 0 100px'}}>
      <Modal size='md' isActive={showModal} adjustToParent={true}><div>Nutsack</div></Modal>
    </div>
  </>);
}
export default App;
