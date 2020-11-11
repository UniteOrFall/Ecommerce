import React, {Fragment, useState} from 'react';

import axios from 'axios'

import {Link, Redirect} from 'react-router-dom';

import {withRouter, RouteComponentProps} from 'react-router-dom'

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import { signup } from '../../actions/auth';

import Main from '../common/main';
const Signup = (props) => {
    const {signup,isAuthenticated} = props;
    console.log(props)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: ''
    });
    console.log(props.location)
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        signup(email,password,phone);
    }
    const {email,password,phone} = formData;
    if(isAuthenticated){
      return  props.location.state?!props.location.state.previous?<Redirect to = "/"></Redirect>:<Redirect to = {props.location.state.previous}></Redirect>:<Redirect to = "/"></Redirect>;
      
    }
    return (
      <Fragment>
      <Main>
      <form className="form" onSubmit = {e=> onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e => onChange(e)}
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            placeholder="Phone Number"
            name="phone"
            minLength="6"
            value={phone} onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already Registered ? <Link to="/login">Login</Link>
      </p>
      </Main>
      </Fragment>
    )
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProp = state => ({

  isAuthenticated: state.auth.isAuthenticated

})

export default connect(mapStateToProp,{ signup })(Signup);