import {userService} from "@/_services";
import React, {Component} from "react";

class SerForChoose extends Component {

    constructor(props) {
        super(props);
        this.state = {

            chooseService:null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(item)
    {
       // this.setState({chooseService:item})

        this.props.ChooseServices(item);
    }
    componentDidMount() {
       console.log( this.state.chooseService)
    }

    render() {

let services=this.props.services;




        return(
            <div style={{margin:"20px"}}>
                <table className="table table-bordered table-striped">
                    <tbody className="thead-dark">
                    <tr>

                        <th  scope="col">Назва послуги</th>
                        <th  scope="col">Опис</th>
                        <th  scope="col">Ціна</th>
                        <th  scope="col"> </th>

                    </tr>
                    {services !== null ?
                        services.map((item, key) => (

                            <tr key={key}>

                                <td>{item.name}</td>
                                <td>{item.desc_ser}</td>
                                <td>{item.price}</td>
                                <td>  <button  id="myModal" onClick={() => this.handleClick(item)}> Забронировать </button></td>
                            </tr>

                        )) : null}
                    </tbody>
                </table>
            </div>

        );
    }

}

export { SerForChoose };