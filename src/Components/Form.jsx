import React, { useState, useEffect } from "react";
import  { Redirect } from 'react-router-dom'
import axios from "axios";
import { useFormik } from 'formik';

function Form(props) {
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    axios
      .get("https://practice.orevan-prox.com/list_items/")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const formik = useFormik({
    initialValues:{
      name:'',
      price:'',
      ammount:''
    },
    onSubmit: values =>{
      axios.post("https://practice.orevan-prox.com/create_item/", values)
      .then((response) => console.log(response.data))
      .catch((err) => {
        console.log(err);
      });
      props.history.replace("/form");
    },
    validate: values => {
      let errors = {}
      if(!values.name){
        errors.name='Name was required'
      }
      if(!values.price){
        errors.price='Name was required'
      }
      if(!values.ammount){
        errors.ammount='Name was required'
      }
      return errors
    }
  })

  return (
    <React.Fragment>
      <h1>
        Form
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          {questions.map((question, index) => (
          <div key={index}>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                onChange={formik.handleChange}
                value={formik.values.name}/>
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Default checked radio
              </label>
            </div>
          </div>
        ))}
          {formik.errors.name ? <div style={{color: 'red'}}>{formik.errors.name}</div> : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default Form;