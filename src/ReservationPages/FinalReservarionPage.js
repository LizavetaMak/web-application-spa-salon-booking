import React, {Component} from "react";
import moment from "moment";

class FinalReservarionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {


        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick()
    {
        this.props.h();
    }

    componentDidMount() {

    }

    render() {



console.log(this.props.reservation[0])
      // let  reservation =this.props.masters;


        return(
            <div> <p>Бронирование</p>
                <p> Послуга: {this.props.name_ser}</p>
                <p> Дата: {moment(this.props.reservation[0][0].date).format("DD.MM.YYYY")}</p>
                <p> Час: {this.props.reservation[0][0].time_start}-{this.props.reservation[0][0].time_end}</p>
                <p> Майстер: {this.props.name_master} </p>
                <button   onClick={() => this.handleClick()}> Повернутися на головну сторінку </button>
            </div>
        );
    }

}

export { FinalReservarionPage };