import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { individualActions } from '../_actions';

class IndividualPage extends React.Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            username: user.username,
            ssn: '',
            merchant:{
                name:'',
                ttl:''
            },
            merchantArr:[]
        };

        this.handleSSNChange = this.handleSSNChange.bind(this);
        this.handleSSNSubmit = this.handleSSNSubmit.bind(this);
    }

    handleSSNChange(event) {
        const { value } = event.target;
        this.setState({
            ssn: value
        });
    }

    handleSSNSubmit(event) {
        event.preventDefault();

        const { ssn } = this.state;
        if (ssn) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { username } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {username}!</h1>

                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedIndividualPage = connect(mapStateToProps)(IndividualPage);
export { connectedIndividualPage as IndividualPage };