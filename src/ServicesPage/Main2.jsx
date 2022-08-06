import React from 'react';
import {authHeader, handleResponse} from "@/_helpers";
import {userService} from "@/_services";





class Main2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users:null,
            f:0,
        };
    };



     componentDidMount() {

         userService.g().then(users1 =>this.setState({users:users1, f:5}) )
    }

    render() {
        console.log(this.state.users);


            let  users2=this.state.users;


        return(
            <div style={{margin:"20px"}}>
            <table className="table table-bordered table-striped">
                <tbody className="thead-dark">
                <tr>
                    <th  scope="col">№ </th>
                    <th  scope="col">Наименование</th>
                    <th  scope="col">Тип</th>
                    <th  scope="col">Цена</th>
                    <th  scope="col">Описание</th>

                </tr>
            {users2 !== null ?
                users2.map((item, key) => (

                    <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.price}</td>
                        <td>{item.desc_ser}</td>
                    </tr>

                    )) : null}
                </tbody>
                </table>
    </div>
        );
    }

}

export { Main2 };