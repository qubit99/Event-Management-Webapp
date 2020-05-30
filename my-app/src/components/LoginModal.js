import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
} from "reactstrap";


const LoginModal = (props) => {
    const {
        buttonLabel,
        className,
    } = props;
    
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      fetch("https://stackhack-api.herokuapp.com/auth", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Successfully logged in");
          window.sessionStorage.setItem("key", data.access_token);
          window.location.href = "/Event-Management-Webapp/#/admin";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } 

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;



    return (
      <div>
        <Button size="lg" color="outline-warning" onClick={toggle}>
          {buttonLabel}Admin Login
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle} close={closeBtn}>
            Admin Login
          </ModalHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <input
                    className="form-control"
                    type="email"
                    name="username"
                    id="Email"
                    placeholder="username@example.com"
                    defaultValue=""
                    ref={register({ required: true, maxLength: 30 })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="Password"
                    placeholder="password"
                    ref={register({ required: true, maxLength: 30 })}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <input
                className="btn btn-success"
                type="submit"
                name="login"
                value="Login"
              />
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
}

export default LoginModal;