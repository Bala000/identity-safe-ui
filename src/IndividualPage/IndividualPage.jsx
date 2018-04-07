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
                <div className="row">
                    <div className="column">
                        <h2>Register SSN</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="usr">SSN:</label>
                                <input type="text" className="form-control" id="usr" />
                            </div>

                        </form>
                        <div className="container">
                            <button type="button" className="btn btn-primary btn-md">Register</button>
                        </div>
                    </div>
                    <div className="column" >
                        <h2>Merchant Register</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="usr">Name/ID:</label>
                                <input type="text" className="form-control" id="usr"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">TTL:</label>
                                <input type="password" className="form-control" id="pwd"/>
                            </div>
                        </form>
                        <div className="container">
                            <button type="button" className="btn btn-primary btn-md">Register</button>
                        </div>
                    </div>
                </div>
                <div className="alert alert-success alert-dismissible">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close"></a>
                    <strong>Data 1:</strong> hjjhvjhvhjv
                </div>
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