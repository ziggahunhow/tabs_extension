import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DefaultModal(props) {
  const { closeModal, title, show, children, confirmFn } = props;
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmFn}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
