import React from 'react';
import {userService} from "@/_services";


class Master extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            masters:null,

        };
    };


     componentDidMount() {
         userService.getAllMasters().then(masters =>this.setState({masters:masters}) )
    }

    render() {
        console.log(this.state.masters);


            let  masters1=this.state.masters;


        return(
            <div style={{margin:"20px"}}>
            <table className="table table-bordered table-striped">
                <tbody className="thead-dark">
                <tr>
                    <th  scope="col">№ </th>
                    <th  scope="col">Имя</th>
                    <th  scope="col">Фамилия</th>
                    <th  scope="col">Профессия</th>
                    <th  scope="col">Услуги</th>
                    <th  scope="col">Номер телефона</th>



                </tr>
            {masters1 !== null ?
                masters1[0].map((item, key) => (

                    <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.job}</td>
                        <td>{item.services}</td>

                        <td>{item.phone}</td>
                    </tr>

                    )) : null}
                </tbody>
                </table>
    </div>
        );
    }

}

export { Master };