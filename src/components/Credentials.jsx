import "./Credentials.css";
import { useState } from "react";

<<<<<<< HEAD
const Credentials = ({ inputTextLabel,cname, cchange, typeHerePlaceholder, idval, input_type, ifreq }) => {
=======
const Credentials = ({ inputTextLabel, typeHerePlaceholder, idval, input_type }) => {
  const [form,setForm] = useState({});
  const handleForm = (e) =>{
    //console.log(e.target.value,e.target.name);
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
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
<<<<<<< HEAD
                name={cname}
                onChange={cchange}
                required={ifreq}
=======
                onChange={handleForm}
                name={input_type}
>>>>>>> 5ca9b091671d8d5abb39a26cba66106f382ed3c1
              />
            
        </div>
      </div>
    );
  }
  
};

export default Credentials;
