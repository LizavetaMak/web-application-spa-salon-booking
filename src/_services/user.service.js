import config from 'config';
import {authHeader, authHeaderPost, handleResponse} from '@/_helpers';

export const userService = {
    getAll,
    getById,
    g,
    getAllMasters,
    GetEmployeeByService,
    GetFreeTime,
    AddReservation,
    getMastersReservationByStatus,
    getMastersStatus,
    getReservationByStatus
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
function g()
{
    const requestOptions = { method: 'GET' };
    return fetch(`${config.apiUrl}/users/all/services`, requestOptions).then(handleResponse);
}
function getAllMasters()
{
    const requestOptions = { method: 'GET' };
    return fetch(`${config.apiUrl}/users/all/masters`, requestOptions).then(handleResponse);
}
function GetEmployeeByService(id_serv)
{

    const requestOptions = { method: 'GET',  headers: authHeader() };
    return fetch(`${config.apiUrl}/users/employee/service/${id_serv}`, requestOptions).then(handleResponse);
}
function GetFreeTime(id_serv, id_emp, r_date)
{


    const requestOptions = { method: 'POST',  headers: authHeaderPost() ,
        body: JSON.stringify({ id_serv, id_emp, r_date  })};
    console.log(requestOptions.body);
    return fetch(`${config.apiUrl}/users/free/time`, requestOptions).then(handleResponse);

}

function AddReservation(t_s, e_t, id_serv, id_emp,r_date )
{


    const requestOptions = { method: 'PUT',  headers: authHeaderPost() ,
        body: JSON.stringify({ id_serv, id_emp,r_date, t_s, e_t })};
    console.log(requestOptions.body);

    return fetch(`${config.apiUrl}/users/add/reservation`, requestOptions).then(handleResponse);

}

function getMastersReservationByStatus(id_status)
{


    const requestOptions = { method: 'POST',  headers: authHeaderPost() ,
        body: JSON.stringify({ id_status })};
    console.log(requestOptions.body);

    return fetch(`${config.apiUrl}/users/master/reservation`, requestOptions).then(handleResponse);

}
function getMastersStatus(id_status,id_service, id_reservation)
{
console.log(id_status,id_service, id_reservation)

    const requestOptions = { method: 'POST',  headers: authHeaderPost() ,
        body: JSON.stringify({ id_status,id_service, id_reservation })};
    console.log(requestOptions.body);

    return fetch(`${config.apiUrl}/users/master/change/status`, requestOptions).then(handleResponse);

}
function getReservationByStatus(id_status)
{


    const requestOptions = { method: 'POST',  headers: authHeaderPost() ,
        body: JSON.stringify({ id_status })};
    console.log(requestOptions.body);

    return fetch(`${config.apiUrl}/users/res`, requestOptions).then(handleResponse);

}


