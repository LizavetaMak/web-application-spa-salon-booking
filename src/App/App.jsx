import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import {MainPage} from "@/MainPage";

import {Main2} from "@/ServicesPage";
import {Master} from "@/MasterPage";
import {RegistrationPage} from "@/RegistrationPage";
import {ReservationPage} from "@/ReservationPages";
import {MasterReservationPage} from "@/MasterReservationPage";
import {AdminStatusPage} from "@/AdminStatusPage";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            isMaster: false,
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin,
            isMaster: x && x.role === Role.Master
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/all/services');
    }

    render() {
        const { currentUser, isAdmin,isMaster } = this.state;
        return (
            <Router history={history}>
                <div>
                    {
                        !currentUser &&
                        <div>
                            <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    {<Link to="/main2" className="nav-item nav-link">Головна сторінка</Link>}
                                    {<Link to="/services" className="nav-item nav-link">Послуги</Link>}
                                    {<Link to="/masters" className="nav-item nav-link">Майстри</Link>}
                                    {<Link to="/login" className="nav-item nav-link">Вхід у систему</Link>}
                                    {<Link to="/registration" className="nav-item nav-link">Реєстрація</Link>}

                                </div>
                            </nav>

                            <Route path="/main2" component={MainPage}/>
                            <Route path="/services" component={Main2}/>
                            <Route path="/masters" component={Master}/>

                            <div className="jumbotron">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <Route path="/login" component={LoginPage}/>
                                            <Route path="/registration" component={RegistrationPage}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">

                                { <Link to="/mainpage" className="nav-item nav-link">Головна сторінка</Link>}
                                {/*<Link to="/" className="nav-item nav-link">Home</Link>*/}
                                {<Link to="/service" className="nav-item nav-link">Послуги</Link>}
                                {<Link to="/master" className="nav-item nav-link">Майстри</Link>}
                                {!isMaster && <Link to="/reservation" className="nav-item nav-link">Забронювати послугу</Link>}
                                {/*{isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}*/}
                                {/*{isAdmin && <Link to="/main" className="nav-item nav-link">main</Link>}*/}
                                {isMaster && <Link to="/masterReservation" className="nav-item nav-link">Бронювання на мої послуги</Link>}
                                {isAdmin && <Link to="/res" className="nav-item nav-link">Бронювання</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Вихід</a>
                            </div>
                        </nav>
                    }
                                    <Route path="/reservation"  component={ReservationPage} />
                                    <Route path="/mainpage"  component={MainPage} />
                                    {/*<PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />*/}
                                    <Route path="/service" component={Main2}/>
                                    <Route path="/master" component={Master}/>
                                    <PrivateRoute path="/res" roles={[Role.Admin]} component={AdminStatusPage} />

                                    <PrivateRoute path="/masterReservation" roles={[Role.Master]} component={MasterReservationPage} />
                </div>
            </Router>
        );
    }
}

export { App };