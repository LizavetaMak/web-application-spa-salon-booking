import React from 'react';

import  './main_css.css';


class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
      //  userService.getAll().then(users => this.setState({ users }));
    }

    render() {
     return(
         <div>

        <div>
            <div className="head">

                <div align="center">

                        <div className="content_top">

                            <div className="Log"> Спа-салон </div>

                        </div>
                    </div>
                </div>
            </div>



            <div align="center">
                <div className="container22">
                    <div className="content_top">
                        <div>
                            <h3 className="left"><a id="abzach0"></a>О нас</h3>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <p>Вже понад 15 років наші спа-салони радують своїх клієнтів якісним обслуговуванням. Ваша краса – це
                        наше досягнення. Ми стежимо за всіма новинками моди в індустрії краси, наші майстри із завидною
                        регулярністю їздять по семінарах у пошуках кращих продуктів з догляду за волоссям та новими
                        технологіями у цій галузі.

                        Широкий спектр послуг приємно здивує, а якість порадує! Ми завжди раді бачити
                        Вас! До нашого салону ходять цілими сім'ями!</p>
                    <p> Адреси:</p>
                    <p>Харків, вул. Героїв праці, 25/71</p>
                    <p>Харків, вул. Чернишевська, 53</p>
                </div>
            </div>
         </div>
                );
    }
}

export { MainPage };