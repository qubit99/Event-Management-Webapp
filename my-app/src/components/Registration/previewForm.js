import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,Button } from "react-bootstrap";

export default class PreviewForm extends Component{
    submit = (event) => {
        event.preventDefault();
        if (this.props.response.name === "" || this.props.response.mob_no === "" || this.props.response.email === "") {
            alert('You have not filled the form correctly')
        }
        else{
            console.log(this.props.response);
            fetch("https://stackhack-api.herokuapp.com/", {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.props.response),
            })
              .then((response) => response.json())
              .then((data) => {
                // console.log("Success:", data);
                alert(
                  `Registration successful. Your registration id is ${data.id}`
                );
                window.location.href = "/Event-Management-Webapp/#/";
              })
              .catch((error) => {
                console.error("Error:", error);
              });
        }
        
        
    };


    render(){
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Preview Form before submitting
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Form Details</h4>
                    <p>
                        Full Name : {this.props.response.name} <br />
                        Mobile no : {this.props.response.mob_no} <br />
                        Email id : {this.props.response.email} <br />
                        Registration Type : {this.props.response.regn_type} <br/>
                        Number of guests : {this.props.response.num_guests}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                        <input
                            id = "submit"
                            type="submit"
                            value="Submit"
                            className="btn btn-success"
                            onClick={this.submit}
                        />

                    <Button variant = "danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    }
    