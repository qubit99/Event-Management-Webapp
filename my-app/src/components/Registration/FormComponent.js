import React, { Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/registerpage.css";
import bsCustomFileInput from "bs-custom-file-input";
import { Form, FormGroup, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import PreviewForm from "./previewForm";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        name: "",
        mob_no: "",
        email: "",
        idcard: "",
        regn_type: "Self",
        num_guests: "1"
      },
      modalShow : false,
      captcha : null,
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  
  getbase64 = (dataUrl) => {
    const res = this.state.response;
    res.idcard = dataUrl;
    this.setState({ response: res });
  }

  toDataURL = (url, callback) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

  inputChanged = (event) => {
    const res = this.state.response;
    res[event.target.name] = event.target.value;
    this.setState({ response: res });
  };

  handleUpload = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);

    this.toDataURL(output.src, this.getbase64);
    
    output.height = 200;
    output.width = 400;
    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }
  };

  handleregn = (event) =>{
    var regn = document.getElementById('num_guests');
    if(this.state.response.regn_type!=="Self"){
      regn.disabled = false;
      let res = this.state.response;
      res.num_guests = 2;
      this.setState({response : res});
      regn.min = 2;
    }
    else{
      let res = this.state.response;
      res.num_guests = 1;
      this.setState({ response: res });
      regn.disabled = true;
    }


  }

  onChange(value) {
  console.log("Captcha value:", value);
  
  this.setState({ captcha: value });
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron jumbotron-billboard mt-1">
          <div className="img"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-3">Stack Hack 1.0</h2>
                <p className="lead">Register for our upcoming event</p>
              </div>
            </div>
          </div>
        </div>
        <legend className="ml-4">Event Registration</legend>
        <Form className="m-4 p-3">
          <div className="row justify-content-around">
            <div className="col-12 col-md-6 order-last">
              <img id="output" className="row ml-3 p-2" alt="" />
              <FormGroup className="row">
                <div className="col-8 col-md-2 mt-2 idcard">ID Card</div>
                <Form.Label className="col-10 col-md-5">
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        type="file"
                        id="custom-file"
                        name="idcard"
                        onChange={this.handleUpload}
                        custom="true"
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                  </div>
                </Form.Label>
              </FormGroup>
            </div>

            <div className="col-12 col-md-6 order-first">
              <FormGroup className="row">
                <div className="col-8 col-md-2">Full Name</div>
                <Form.Label className="col-10 col-md-7">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.response.name}
                    onChange={this.inputChanged}
                  />
                </Form.Label>
              </FormGroup>
              <FormGroup className="row">
                <div className="col-8 col-md-2"> mob_no Number</div>
                <Form.Label className="col-10 col-md-7">
                  <input
                    className="form-control"
                    type="text"
                    name="mob_no"
                    value={this.state.response.mob_no}
                    onChange={this.inputChanged}
                  />
                </Form.Label>
              </FormGroup>
              <FormGroup className="row">
                <div className="col-8 col-md-2">Email</div>
                <Form.Label className="col-10 col-md-7">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={this.state.response.email}
                    onChange={this.inputChanged}
                  />
                </Form.Label>
              </FormGroup>
              <FormGroup className="row">
                <div className="col-8 col-md-2">Registration type</div>
                <Form.Label className="col-10 col-md-7">
                  <select
                    className="form-control"
                    id="regn_type"
                    name="regn_type"
                    value={this.state.response.regn_type}
                    onChange={(e) => {
                      this.inputChanged(e);
                      this.handleregn(e);
                    }}>
                    <option>Self</option>
                    <option>Group</option>
                    <option>Corporate</option>
                    <option>Others</option>
                  </select>
                </Form.Label>
              </FormGroup>
              <FormGroup className="row">
                <div className="col-8 col-md-2">Number of tickets</div>
                <Form.Label className="col-10 col-md-7">
                  <input
                    className="form-control"
                    id="num_guests"
                    disabled={true}
                    type="number"
                    min="1"
                    name="num_guests"
                    value={this.state.response.num_guests}
                    onChange={this.inputChanged}
                  />
                </Form.Label>
              </FormGroup>
              <FormGroup className="row">
                <ReCAPTCHA
                  sitekey="6Lf10P0UAAAAAEAIMcsxIWVn1Yvmy5EIpSxMxuZr"
                  onChange={this.onChange}
                />
              </FormGroup>
            </div>
          </div>
          <Button
            variant="warning"
            onClick={() => this.setState({ modalShow: true })}>
            Preview
          </Button>

          <PreviewForm
            response={this.state.response}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
        </Form>
      </div>
    );
  }
}

export default FormComponent;
