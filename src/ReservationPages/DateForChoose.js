import React, {Component} from "react";
import Calendar from 'ciqu-react-calendar'
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {authenticationService} from "@/_services";

class DateForChoose extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: moment()
        }
    }



    render() {

      let time= this.props.freeTimes;
        return (
            <div>

                <h2>Оберіть дату бронювання</h2>


                <Formik
                    initialValues={{

                        r_date: '',
                    }}
                    validationSchema={Yup.object().shape({
                        r_date: Yup.date()
                            .required("dateOfBirth is Required")
                            .min(new Date(), "Are you a time traveler?!")
                    })}
                    onSubmit={({r_date}, { setStatus, setSubmitting }) => {
                        console.log(r_date)
                        try {
                            this.props.GetFreeTime(r_date)
                            setSubmitting(false);
                        } catch (error)  {
                                setSubmitting(false);
                                setStatus(error);

                            }}}

                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>

                            <div className="form-group">
                                <label htmlFor="r_date">Дата бронювання</label>
                                <Field name="r_date" type="date" className={'form-control' + (errors.r_date && touched.r_date ? ' is-invalid' : '')}/>
                                <ErrorMessage name="r_date" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Дізнатися вільний час для бронювання</button>

                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>

                    )}
                />

                {time !== null ?
                    time[0].map((item, key) => (

                         <button  onClick={ () => {this.props.handlClick(item.s_t,item.e_t)}} style={{  margin:'8px'}} key={key} type="button" className="btn btn-info" > {item.s_t.substring(0, 5)} - {item.e_t.substring(0, 5)} </button>

                    )) : null}
            </div>



        )
    }

}

export { DateForChoose };