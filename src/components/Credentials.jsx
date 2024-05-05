import "./Credentials.css";
import { useState } from "react";

const Credentials = ({ inputTextLabel, typeHerePlaceholder, idval, input_type }) => {
  const [form,setForm] = useState({});
  const handleForm = (e) =>{
    //console.log(e.target.value,e.target.name);
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  
  if(input_type==="submit"){
    return(
      <div className="button31">
       
              <input
                className="button31inp"
                placeholder={typeHerePlaceholder}
                id={idval}
                type="submit"
               
              />
       
      </div>
    );
  }
  else{
    return (
      <div className="credentials5">
        <div className="username5">
          <div className="input-text-label5">{inputTextLabel}</div>
         
              <input
                className="type-here5"
                placeholder={typeHerePlaceholder}
                id={idval}
                type={input_type}
                onChange={handleForm}
                name={input_type}
              />
            
        </div>
      </div>
    );
  }
  
};

export default Credentials;
