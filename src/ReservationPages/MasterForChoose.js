import React, {Component} from "react";
import {userService} from "@/_services";

class MasterForChoose extends Component {

    constructor(props) {
        super(props);
        this.state = {

           // chooseService:null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(item)
    {
        this.props.ChooseMaster(item);
    }

    componentDidMount() {

    }

    render() {

       // console.log(this.state.masters);


        let  masters=this.props.masters;


        return(
            <div style={{margin:"20px"}}>
                <table className="table table-bordered table-striped">
                    <tbody className="thead-dark">
                    <tr>

                        <th  scope="col">Ім`я</th>

                        <th  scope="col">Професія</th>
                        <th  scope="col"></th>




                    </tr>
                    {masters !== null ?
                        masters[0].map((item, key) => (

                            <tr key={key}>

                                <td>{item.name} {item.surname}</td>
                                <td>{item.job}</td>
                                 <td>  <button   onClick={() => this.handleClick(item)}> Обрати </button></td>
                            </tr>

                        )) : null}
                    </tbody>
                </table>
            </div>
        );
    }

}

export { MasterForChoose };