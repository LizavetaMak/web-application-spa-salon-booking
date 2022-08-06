import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {authenticationService} from '@/_services';


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/main2');
        }
    }

    render() {
        const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

        return (
            <div>

                <h2>Registration</h2>


                <Formik
                    initialValues={{
                        name: '',
                        password: '',
                        email: '',
                        phone: '',
                        dateOfBirth: '',
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .max(15, 'Must be 50 characters or less')
                            .min(4, 'Must be 4  characters or more')
                            .required('Required'),

                        password: Yup.string().required('Password is required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
                            .required('Required'),
                        dateOfBirth: Yup.date()
                            .required("dateOfBirth is Required")
                            .max(new Date(), "Are you a time traveler?!")

                    })}
                    onSubmit={({ name, password, email, phone, dateOfBirth }, { setStatus, setSubmitting }) => {
                        setStatus();

                        authenticationService.registration(name, password, email, phone, dateOfBirth)
                            .then(
                                user => {
                                    authenticationService.login(email, password)
                                        .then(
                                            user => {
                                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                                this.props.history.push(from);
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            }
                                        );
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );

                    }}

                    render={({ errors, status, touched, isSubmitting }) => (
                    <Form>

                        <div className="form-group">
                            <label htmlFor="name"> ФИО</label>
                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}/>
                            <ErrorMessage name="name" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Почта</label>
                            <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Номер телефона</label>
                            <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')}/>
                            <ErrorMessage name="phone" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Дата рождения</label>
                            <Field name="dateOfBirth" type="date" className={'form-control' + (errors.dateOfBirth && touched.dateOfBirth ? ' is-invalid' : '')}/>
                            <ErrorMessage name="dateOfBirth" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Зарегистрироваться</button>
                            {isSubmitting &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                        {status &&
                            <div className={'alert alert-danger'}>{status}</div>
                        }
                    </Form>

                    )}
                    />
            </div>


        )
    }
}

export {RegistrationPage};