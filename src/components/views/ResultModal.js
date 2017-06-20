import React from 'react';
import Modal from 'react-modal';

const ResultModal = (props) => {
  console.log(props);
   if (!props.selectedResult) {
    return <div></div>;
  }

  return (
    <Modal
      isOpen={ props.modalIsOpen }
      onRequestClose={ () => props.onRequestClose() }>
      <div className="result-modal">
        <p>HEEEEJ SOFIE HETER JAG</p>
        <button onClick={() => props.onRequestClose()}>close</button>
      </div>
    </Modal>
  );
};

export default ResultModal;