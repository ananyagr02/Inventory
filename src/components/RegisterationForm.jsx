import { useCallback, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import Credentials from "./Credentials";
import { useNavigate } from "react-router-dom";
import "./RegisterationForm.css";

const RegisterationForm = () => {
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(form)
   }
  const navigate = useNavigate();
  
  const[form, setForm]=useState({});
  
  const handlereg=(e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response= await fetch('http://localhost:8080/demo',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
      
    })
    const data= await response.json();
    console.log(data);
  }

  const onButtonClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onButton2Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
<<<<<<< HEAD
    <div className="registeration-form">
=======
    <form className="registeration-form" onSubmit={handleSubmit}>
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
      <div className="background25" />
      <div className="logo-frame">
        <h2 className="logo6">REGISTER</h2>
      </div>
      <form className="credentials-group" onClick={handleSubmit}>
        <Credentials
          inputTextLabel="Name"
          typeHerePlaceholder="Name"
          type="text"
<<<<<<< HEAD
          cname="uname"
          cchange={handlereg}
          ifreq="true"
=======
          input_type="Name"
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
        />
        <Credentials
          inputTextLabel="Email"
          typeHerePlaceholder="Email"
          type="email"
<<<<<<< HEAD
          cname="usermail"
          cchange={handlereg}
          ifreq="true"
=======
          input_type="Email"
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
        />
        <Credentials
          inputTextLabel="Phone Number"
          typeHerePlaceholder="Phone Number"
<<<<<<< HEAD
          input_type="text"
          cname="phoneno"
          cchange={handlereg}
          ifreq="true"
=======
          type="text"
          input_type="Phone Number"
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
        />
        <div className="dropdowns">
          <div className="dropdown-title" >Company Role</div>
          <Form.Select className="input-field-formselect" name="role" onChange={handlereg} required="true">
            <option>Company Role</option>
            <option value="'Warehouse Manager'">'Warehouse Manager'</option>
            <option value="'Order Fulfillment Specialist'">
              'Order Fulfillment Specialist'
            </option>
            <option value="'Receiving Clerk'">'Receiving Clerk'</option>
            <option value="'Returns Clerk'">'Returns Clerk'</option>
          </Form.Select>
        </div>
        <Credentials
          inputTextLabel="Password"
          typeHerePlaceholder="Enter a valid password"
<<<<<<< HEAD
          input_type="password"
          cname="pass"
          cchange={handlereg}
          ifreq="true"
=======
          type="password"
          input_type="Password"
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
        />
        <Credentials
          inputTextLabel="Confirm Password"
          typeHerePlaceholder="Enter your password"
<<<<<<< HEAD
          input_type="password"
          cchange={handlereg}
          cname="passconfirm"
          ifreq="true"
        />
        <input type="submit" placeholder="submit" className="buttonsubmit" onClick={onButtonClick}/>
        
        <button className="buttonsubmit" onClick={onButton2Click}>
          cancel
=======
          type="password"
          input_type="Confirm Password"
        />
        {/* <Credentials
          inputTextLabel="Register"
          typeHerePlaceholder="register"
          input_type="submit"
          idval="register_conf"
        /> */}
<div className="button-container">
<div className="button-frame3">
        <button className="button18" onClick={onButtonClick}>
          <div className="input-field-instance">Submit</div>
          <div className="background26" />
        </button>
        </div>
      </div>
        <div className="button-container">
        <button className="button18" onClick={onButton2Click}>
          <div className="input-field-instance">Cancel</div>
          <div className="background26" />
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
        </button>
        
        
      
      </form>
    </div>
  );
};

export default RegisterationForm;