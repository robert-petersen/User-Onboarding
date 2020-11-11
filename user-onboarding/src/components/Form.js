import React from "react";

export default function Form(props){
  const {formValues, disabled, errors, inputChange, formSubmit} = props;

  const onChange = (evt) => {
    const {name, value, checked, type} = evt.target;
    const correctValue = type === "checkbox" ? checked : value;
    inputChange(name, correctValue);
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    formSubmit();
  }

  return(
    <form onSubmit={onSubmit}>
      <h2 className="formTitle">Add New Member</h2>

      <label>First Name:
        <input
          name='first_name'
          type='text'
          value={formValues.first_name}
          onChange={onChange}
        />
      </label>

      <label>Last Name:
        <input
          name='last_name'
          type='text'
          value={formValues.last_name}
          onChange={onChange}
        />
      </label>

      <label>Email:
        <input
          name='email'
          type='email'
          value={formValues.email}
          onChange={onChange}
        />
      </label>

      <label>Password:
        <input
          name='password'
          type='password'
          value={formValues.password}
          onChange={onChange}
        />
      </label>

      <label>Terms and Services
          <input
            type="checkbox"
            name="terms"
            checked={formValues.terms}
            onChange={onChange}
          ></input>
        </label>

        <div className="submit-container">
          <div className='errors'>
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.terms}</div>
          </div>
          <button disabled={disabled}>Submit!</button>
        </div>

    </form>
  )
}