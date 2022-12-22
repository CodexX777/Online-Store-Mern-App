import React from "react";
import Modal from "../Modal/Modal";
import Button from "./Button";

const ErrorModal = (props) => {
  return (
    <Modal
      className="Error"
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
