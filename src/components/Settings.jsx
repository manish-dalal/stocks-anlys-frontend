import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {  apiIntervalArray } from '../utils';

export const Settings = () => {
  const [show, setShow] = useState(false);
  const [apiInterval, setApiInterval] = useState(localStorage.getItem('apiInterval') || '3');
  const [activeBackend, setActiveBackend] = useState(localStorage.getItem('activeBackend') || '0');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Settings
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(el) => setApiInterval(el.target.value)} value={apiInterval}>
            {apiIntervalArray.map((e, i) => (<option key={e} value={i.toString()}>{e}</option>))}
          </Form.Select>
          <Form.Select onChange={(el) => setActiveBackend(el.target.value)} value={activeBackend}>
            <option value='0'>Replit</option>
            <option value='1'>Render</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              localStorage.setItem('apiInterval', apiInterval)
              localStorage.setItem('activeBackend', activeBackend)
              handleClose();
              window.location.reload()
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
