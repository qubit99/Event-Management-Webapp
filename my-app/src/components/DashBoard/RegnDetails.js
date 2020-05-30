import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import SideBar from "./SideBar"
class RegnDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.history.location.state.id,
            data : {}
        }
    }

    componentDidMount() {
        let key = window.sessionStorage.getItem("key");
        console.log(key);
        fetch(`https://stackhack-api.herokuapp.com/details/${this.state.id}`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${window.sessionStorage.getItem("key")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log("Success:", data);
            this.setState({ data, data });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    }

    delete = (event) => {
        fetch(`https://stackhack-api.herokuapp.com/details/${this.state.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `JWT ${window.sessionStorage.getItem("key")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            window.location.href = "/Event-Management-Webapp/#/admin";
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    }

    render() {
        return (
            <div className="row justify-items-start">
                <div className="col-3">
                    <SideBar />
                </div>
                <div className = "col-6 pt-3 mt-3">
                    <div>
                        <Card className = "mt-4">
                            <CardImg top width="100%" height = "400px"src={this.state.data.id_card}  alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{this.state.data.name}'s Registration Details</CardTitle>
                                <CardText>
                                    Email : {this.state.data.email} <br />
                                    Phone : {this.state.data.mob_no} <br />
                                    Registration Type : {this.state.data.regn_type} <br />
                                    Number of Tickets : {this.state.data.num_guests}     
                                </CardText>
                                <Button color = "danger" onClick = {this.delete}>Delete</Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegnDetails;