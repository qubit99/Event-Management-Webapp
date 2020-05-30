import React, { Component } from 'react'
import { Chart } from "react-google-charts";
import SideBar from "./SideBar";

export default class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [[]]
        }
    }

    componentDidMount(){
        fetch(`https://stackhack-api.herokuapp.com/stats`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${window.sessionStorage.getItem("key")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            this.setState({ data, data });
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
                <div className="col-6 pt-3 mt-3">
                    <Chart
                        width={'1000px'}
                        height={'600px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Registration type', 'No of registrations'],
                            ...this.state.data
                        ]}
                        options={{
                            title: 'Registration type Pie Chart',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>
        )
    }
}

