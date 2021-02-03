import Modal from './components/Modal/Modal';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  return (<>
  <div id="parent" style={{ height: '400px', width: '50%', backgroundColor: 'lightslategray', margin: '5% auto'}}>
    <Modal size='xl'
            isActive={showModal} 
            confirmAction={() => setShowModal(false)}
            closeAction={() => setShowModal(false)} 
            adjustToParent={false}
            ></Modal>
  </div>
  {/* TODO: create form for changing sizes of modal as well as placing it within div */}
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
  <button 
    onClick={() => {
    setShowModal(!showModal);
  }}>Click Me!</button>
  </div>
  </>);
}
export default App;
