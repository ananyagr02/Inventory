import { useCallback } from "react";
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

  const onButtonClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onButton2Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <form className="registeration-form" onSubmit={handleSubmit}>
      <div className="background25" />
      <div className="logo-frame">
        <h2 className="logo6">REGISTER</h2>
      </div>
      <div className="credentials-group">
        <Credentials
          inputTextLabel="Name"
          typeHerePlaceholder="Name"
          type="text"
          input_type="Name"
        />
        <Credentials
          inputTextLabel="Email"
          typeHerePlaceholder="Email"
          type="email"
          input_type="Email"
        />
        <Credentials
          inputTextLabel="Phone Number"
          typeHerePlaceholder="Phone Number"
          type="text"
          input_type="Phone Number"
        />
        <div className="dropdowns">
          <div className="dropdown-title" >Company Role</div>
          <Form.Select className="input-field-formselect">
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
          type="password"
          input_type="Password"
        />
        <Credentials
          inputTextLabel="Confirm Password"
          typeHerePlaceholder="Enter your password"
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
        </button>
      </div>
      
      </div>
    </form>
  );
};

export default RegisterationForm;