import Modal from './components/Modal/Modal';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  // console.log(showModal);

  return (<><button onClick={() => {
    setShowModal(!showModal);
  }}>Click Me!</button>
    <div id="parent" style={{ height: '400px', width: '50%', backgroundColor: 'lightslategray', margin: '200px 0 0 100px'}}>
      <Modal size='xl'
             isActive={showModal} 
             confirmAction={() => setShowModal(false)}
             closeAction={() => setShowModal(false)} 
             adjustToParent={false}></Modal>
    </div>
  </>);
}
export default App;
