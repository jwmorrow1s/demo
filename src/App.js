import Modal from './components/Modal/Modal';
import { useState } from 'react';
import './App.css';

const App = () => {
  const sizes = Object.freeze(['sm', 'md', 'lg', 'xl']);
  const modalAdjustments = Object.freeze([false, true]);
  const [sizeIndex, setSizeIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalAdjustment, setModalAdjustment] = useState(0);
  return (<>
  <div id="parent" style={{ height: '400px', width: '50%', backgroundColor: 'lightslategray', margin: '5% auto'}}>
    <Modal size={sizes[sizeIndex]}
            isActive={showModal} 
            confirmAction={() => setShowModal(false)}
            closeAction={() => setShowModal(false)} 
            adjustToParent={modalAdjustments[modalAdjustment]}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ textAlign: 'center', paddingBottom: '2px'}}>Modal Sizes</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <button style={{ flexGrow: '1', border: `${sizeIndex === 0 ? '1px solid blue' : 'unset'}`}} onClick={() => setSizeIndex(0)}>SM</button>
          <button style={{ flexGrow: '1', border: `${sizeIndex === 1 ? '1px solid blue' : 'unset'}`}} onClick={() => setSizeIndex(1)}>MD</button>
          <button style={{ flexGrow: '1', border: `${sizeIndex === 2 ? '1px solid blue' : 'unset'}`}} onClick={() => setSizeIndex(2)}>LG</button>
          <button style={{ flexGrow: '1', border: `${sizeIndex === 3 ? '1px solid blue' : 'unset'}`}} onClick={() => setSizeIndex(3)}>XL</button>
        </div>
      </div>
        <div style={{ textAlign: 'center', margin: '3px 0'}}>Modal Position</div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <button style={{ flexGrow: '1', margin: '2px', border: `${modalAdjustment === 0 ? '1px solid blue' : 'unset'}`}} onClick={() => setModalAdjustment(0)}>Global</button>
          <button style={{ flexGrow: '1', margin: '2px', border: `${modalAdjustment === 1 ? '1px solid blue' : 'unset'}`}} onClick={() => setModalAdjustment(1)}>Nested</button>
        </div>
    </Modal>
  </div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
  <button 
    onClick={() => {
    setShowModal(!showModal);
  }}>Click Me!</button>
  </div>
  </>);
}
export default App;
