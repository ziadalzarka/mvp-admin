import React, {useReducer , useState } from 'react';
import SetCookie from '../../hooks/setCookie';

import './Signin.css';

import { Form, Row } from "react-bootstrap";

import {validate  , VALIDATOR_REQUIRE ,VALIDATOR_MINLENGTH} from '../../util/validators';

import ErrorModal from '../../LoadingSpinner/ErrorModal';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import axios from 'axios';

//EMAIL validation
const usernameReducer =(state , action) =>{
  switch(action.type){
    case 'CHANGE':
    return {
      ...state,
      value : action.username, 
      isValid : validate(action.username , action.validators)
    };
    case 'TOUCH':
      return {
        ...state,       
        isTouched : true
      };
    default:
      return state ;
  }
}
//pass validation
const passReducer =(state , action) =>{
  switch(action.type){
    case 'CHANGE':
    return {
      ...state,
      value : action.pass, 
      isValid : validate(action.pass , action.validators)
    };
    case 'TOUCH':
      return {
        ...state,       
        isTouched : true
      };
    default:
      return state ;
  }
}


const SignIn = () => {


//EMAIL validation 
const [usernameState , dispatch2 ]= useReducer(usernameReducer , {
  value:'' ,
  isValid: false,
  isTouched :false
  });
  
  
const usernameChangeHandler = event =>{
  dispatch2({type:'CHANGE', username : event.target.value , validators: [VALIDATOR_MINLENGTH(3)] });
};
const touchHandler = () =>{
  dispatch2({
    type :'TOUCH'
  })
}

//PASS validation 
const [passState , dispatch3 ]= useReducer(passReducer , {
  value:'' ,
  isValid: false,
  isTouched :false
  });
  
  
  const passChangeHandler = event =>{
    dispatch3({type:'CHANGE', pass : event.target.value , validators: [VALIDATOR_REQUIRE()] });
  };
  const passtouchHandler = () =>{
    dispatch3({
      type :'TOUCH'
    })
  }


const [isLoading ,setIsLoading] = useState(false);
const [error , setError] = useState(false);



const emailSubmitHandler = async event =>{
  event.preventDefault();
  // send api request to validate data and get token
  setIsLoading(true);
  try {
    setError(null);
    const response = await axios.post(
      "https://coral-app-35v54.ondigitalocean.app/login",
      {
        username : usernameState.value,
        password: passState.value  
      }
    );
    const responseData = await response;
   console.log(responseData.data) ;
   localStorage.setItem("UserData" , JSON.stringify(responseData.data.user.username));
   SetCookie("Token" , responseData.data.token);
   setIsLoading(false);
   window.location.href = '/' ;
  } 
  catch (err) {
    console.log(err);
    setIsLoading(false);
    setError(err.response.data.error || "SomeThing Went Wrong , Please Try Again .");
  }

};


const errorHandler =() =>{
   setError(null) ;
}

  return (
    <div className='p-4 row justify-content-center w-100'>
      <div className='col-12 my-5'>
        <h1 className='col-12 text-center text-white'> Sign In </h1> 
          <div id="header-graphic" className="d-flex justify-content-center ">
              <div className="creative-break">
                  <div className="left-diamond diamond text-white"></div>
                  <div className="right-diamond diamond text-white"></div> 
              </div>
          </div>
      </div>
      <Row className='col-12 p-0 m-0 justify-content-center'>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && <LoadingSpinner asOverlay/>}
       <Form className="col-12 col-lg-6 " onSubmit={emailSubmitHandler}>
          <Row className='w-100 justify-content-center m-0'>          
            <Form.Group  className= "mb-3 col-md-10 col-12 text-center p-0" >
              <Form.Label className="lable fw-bold text-white p-3"> <span style={{ color:'red'}}>*</span> UserName <span style={{ color:'red'}}>*</span></Form.Label>
              <Form.Control
              controlid='username'
              value={usernameState.value}
              onChange={usernameChangeHandler}
              onBlur={touchHandler}
              isValid={usernameState.isValid}
              type='name'
              placeholder="User Name " 
              className={`p-3 ${!usernameState.isValid && usernameState.isTouched && 'form-control-invalid' }`}/>
            {!usernameState.isValid && usernameState.isTouched && <p style={{color:'red'}}>Please Enter A Vaild UserName</p>}

            </Form.Group>

            <Form.Group className="mb-3 col-md-10 col-12 text-center p-0" controlId="formGridPassword">
              <Form.Label className="fw-bold text-white p-3"><span style={{ color:'red'}}>*</span>Password <span style={{ color:'red'}}>*</span></Form.Label>
              <Form.Control
              controlid='password'
              value={passState.value}
              onChange={passChangeHandler}
              onBlur={passtouchHandler}
              isValid={passState.isValid}
              type="password" 
              placeholder="Password" 
              className={`p-3 ${!passState.isValid && passState.isTouched && 'form-control-invalid' }`}
              />
            {!passState.isValid && passState.isTouched && <p style={{color:'red'}}>Please Enter A Vaild PassWord</p>}

            </Form.Group>

          </Row>
        <div className='row w-100 justify-content-center m-0'>

          <button     
            className='sign-btn fs-4 rounded col-md-4 col-6 fw-bold text-white p-3 my-3'
            disabled={!usernameState.isValid || !passState.isValid}
            type="submit"
            style={{ background:'#007063' ,  cursor: 'pointer' }}>
            SIGN IN                              
          </button>

        </div>

      </Form>

    </Row>
      
  </div>
  )
}

export default SignIn
