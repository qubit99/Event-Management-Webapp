import React, { Component } from 'react';
import SideBar from "./SideBar";
import {Link, withRouter} from 'react-router-dom';
import { Table, Pagination, PaginationItem, PaginationLink} from "reactstrap";

import "../../css/sidebar.css"

class RegnContent extends Component {
    

    constructor(props) {
        super(props)
    
        this.state = {
            data : [],
            page : 1
        }
            
    }

    componentDidMount() {
        
        fetch(`https://stackhack-api.herokuapp.com/all/${this.state.page}`, {
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

    componentDidUpdate(prevProps, prevState){
        if(this.state.page!==prevState.page){
            let key = window.sessionStorage.getItem("key");
            console.log(key);
            fetch(
              `https://stackhack-api.herokuapp.com/all/${this.state.page}`,
              {
                method: "GET",
                headers: {
                  Authorization: `JWT ${window.sessionStorage.getItem("key")}`,
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                // console.log("Success:", data);
                this.setState({ data, data });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
        }
    }
    
    
    render() {
        const data = this.state.data;
        
        return (
            <div>
                <div className="row justify-items-start">
                    <div className="col-3">
                        <SideBar />
                    </div>
                    <div className="col-6">
                        <div className = "mt-3 pt-3">
                            <h2 className="p-2">Registration Details</h2>
                            <Table style={{ width: "75%" }} className="mt-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((obj) => {
                                        return (
                                            <tr>
                                                <th scope="row" ><Link to={{
                                                    pathname: `/admin/regn/${obj.id}`,
                                                    state: { id: `${obj.id}` }
                                                }}>{obj.id}</Link></th>
                                                <td>{obj.name}</td>
                                                <td> {obj.date}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <Pagination aria-label="Page navigation example">

                                <PaginationItem>
                                    <PaginationLink previous onClick={(event) => { this.setState({ page: this.state.page - 1 }) }} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink next onClick={(event) => { this.setState({ page: this.state.page + 1 }) }} />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}



export default withRouter(RegnContent);
