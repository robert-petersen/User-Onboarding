import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as Yup from "yup";
import Form from "./components/Form";
import User from "./components/User";
import schema from "./components/Schema";


const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  terms: false,
}
const emptyErrors = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  terms: "",
}

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(emptyForm);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(emptyErrors);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res)=>{
        console.log(res.data.data);
        setUsers(res.data.data);
        console.log(users);
      })
      .catch((err)=>{
        console.log("Error (axios get)", err);
      });
  }

  const postNewUser = newUser => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res)=>{
        setUsers([res.data, ...users]);
        setFormValues(emptyForm);
      })
      .catch((err)=>{
        console.log("Error (axios post)", err)
        setFormValues(emptyForm);
      })
  }

  const inputChange = (name, value) => {
    Yup.reach(schema, name)
      .validate(value)
      .then(()=>{
        setErrors({
          ...errors,
          [name]: "",
        })
      })
      .catch((err)=>{
        setErrors({
          ...errors,
          [name]: err.errors[0],
        })
    });
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = ()=>{
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    }
  postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then((valid)=> {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">

    <Form 
      formValues={formValues} 
      disabled={disabled}
      errors={errors}
      inputChange={inputChange}
      formSubmit={formSubmit}
    />

    <div className="users-container">
      {
        users.map(user => {
          return(
            <User key={user.id} details={user} />
          )
        })
      }
    </div>

    </div>
  );
}

export default App;
