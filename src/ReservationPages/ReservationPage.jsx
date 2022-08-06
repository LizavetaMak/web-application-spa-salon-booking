import React from 'react';
import {userService} from "@/_services";
import {SerForChoose} from "@/ReservationPages/SerForChoose";
import {MasterForChoose} from "@/ReservationPages/MasterForChoose";
import {DateForChoose} from "@/ReservationPages/DateForChoose";
import {FinalReservarionPage} from "@/ReservationPages/FinalReservarionPage";


class ReservationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            services:null,
            chooseService:null,
            show:null,
            mastersByService:null,
            chooseMaster:null,
            freeTimes:null,
            chooseDate:null,
            reservation:null,
        };
        this.ChooseService = this.ChooseService.bind(this);
        this.ChooseMaster = this.ChooseMaster.bind(this);
        this.GetFreeTime = this.GetFreeTime.bind(this);
        this.AddReservation = this.AddReservation.bind(this);
        this.h = this.h.bind(this);
    };

h(){
    this.props.history.push('/mainpage');
}
     componentDidMount() {
         userService.g().then(services1 =>this.setState({services:services1, show:"services"}) )
        // console.log(this.state.chooseService, 41194645498)

    }
    ChooseService(item)
    {

       this.setState({chooseService:item})
        userService.GetEmployeeByService(item.id_service).then(masters => this.setState({mastersByService:masters, show:"masters"}) )
       console.log(this.state.mastersByService);
    }

    AddReservation(time_s, time_end)
    {


        userService.AddReservation(time_s, time_end, this.state.chooseService.id_service, this.state.chooseMaster.id_employee,this.state.chooseDate )
            .then(reservation1 => this.setState({reservation:reservation1, show:"reservation"}) )

    }
    GetFreeTime(r_date)
    {

        this.setState({chooseDate:r_date})
        userService.GetFreeTime(this.state.chooseService.id_service, this.state.chooseMaster.id_employee, r_date).then(time => this.setState({freeTimes:time} ) )
        console.log(this.state.freeTimes);
    }
    ChooseMaster(item)
    {

        this.setState({chooseMaster:item, show:"calendar"})

    }
    render() {

let show =this.state.show;

        return(
            <div>
                {show === "services" &&
                    <SerForChoose
                        services={this.state.services}
                        ChooseServices={this.ChooseService}
                    />
                }
                {show ==="masters" &&
                    <MasterForChoose
                        masters={this.state.mastersByService}
                        ChooseMaster={this.ChooseMaster}

                    />
                }
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                {show ==="calendar" &&
                    <DateForChoose
                        freeTimes={this.state.freeTimes}
                        GetFreeTime={this.GetFreeTime}
                        handlClick={this.AddReservation}
                    />
                }
                                {show ==="reservation" &&
                                    <FinalReservarionPage
                                        reservation={this.state.reservation}
                                       name_master={this.state.chooseMaster.name}
                                       name_ser={this.state.chooseService.name}
                                        h={this.h}
                                    />
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { ReservationPage };