import React from 'react';
import {userService} from "@/_services";
import moment from "moment";


class AdminStatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            masters:null,
            id_s:0,
        };
        this.C = this.C.bind(this);
        this.a = this.a.bind(this);
    };

     C(s){

         userService.getReservationByStatus(s).then(masters =>this.setState({masters:masters, id_s:s}) )
     }
    a(item, s){

        userService.getMastersStatus(s, item.id_service, item.id_reservation).then(res=> this.C(this.state.id_s) )
    }

    componentDidMount() {
        console.log(351555654)

        userService.getReservationByStatus(0).then(masters =>this.setState({masters:masters, id_s:0}) )
    }

    render() {

        let  masters1=this.state.masters;


        return(
            <div>

                <button style={{  margin:'8px'}} className="btn btn-primary"  onClick={()=> this.C(0)}> Всі </button>
                <button style={{  margin:'8px'}} className="btn btn-primary"  onClick={()=> this.C(1)}> Нові </button>
                <button style={{  margin:'8px'}} className="btn btn-primary"  onClick={()=> this.C(2)}> Підтверджені </button>
                <button style={{  margin:'8px'}} className="btn btn-primary" onClick={()=> this.C(4)}> Виконані </button>
                <button style={{  margin:'8px'}} className="btn btn-primary" onClick={()=> this.C(3)}> Скасовані </button>
                <button style={{  margin:'8px'}} className="btn btn-primary" onClick={()=> this.C(6)}> Ненадані </button>
                <button style={{  margin:'8px'}} className="btn btn-primary" onClick={()=> this.C(5)}> Завершені </button>

                <div style={{margin:"20px"}}>
                <table  style={{ tableLayout: "auto"}} className="table table-bordered table-striped">
                    <tbody className="thead-dark">
                    <tr>
                        <th  scope="col">Дата</th>
                        <th  scope="col">Час</th>
                        <th  scope="col">Послуга</th>
                        <th  scope="col">Користувач</th>
                        <th  scope="col">Номер телефону користувача</th>
                        <th  scope="col">Статус</th>
                        <th  scope="col"> </th>


                    </tr>
                    {masters1 !== null ?
                        masters1[0].map((item, key) => (

                            <tr key={key}>
                                {/*<td>{key+1}</td>*/}
                                <td>{moment(item.date).format("DD.MM.YYYY")}</td>
                                <td>{item.time_start} - {item.time_end} </td>
                                <td>{item.service}</td>
                                <td>{item.user}</td>
                                <td>{item.user_phone}</td>
                                <td>{item.status}</td>

                                { item.status==="Нове" &&
                                    <td>
                                        <button style={{  margin:'8px'}} className="btn btn-primary"  onClick={()=> this.a(item,2)}> Підтвердити  </button>
                                        <button style={{  margin:'8px'}} className="btn btn-primary"  onClick={()=> this.a(item,3)}> Відмінити   </button>
                                </td>

                                }
                                {item.status === "Підтвержене" &&
                                    <td>
                                        <button style={{margin: '8px'}} className="btn btn-primary"
                                                onClick={() => this.a(item, 4)}> Виконати
                                        </button>
                                        <button style={{  margin:'8px'}} className="btn btn-primary"  onClick={()=> this.a(item,3)}> Відмінити   </button>
                                    </td>
                                }
                                {item.status === "Виконане" &&
                                    <td>
                                        <button style={{margin: '8px'}} className="btn btn-primary"
                                                onClick={() => this.a(item, 5)}> Завершити
                                        </button>
                                    </td>
                                }
                            </tr>

                        )) : null}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }

}

export { AdminStatusPage };