import React from "react";
import "./App.css";
class BasicForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleUserInput = this.handleUserInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.isAttendingChange = this.isAttendingChange.bind(this);

    this.state = {
      message: "",
      firstname: "",
      lastname: "",
      email: "",
      alert: "",
      isSubmitted: false,
      isAttending: true,
      formErrors: { firstname: "", lastname: "", email: "" },
      firstnameValid: false,
      lastnameValid: false,
      emailValid: false,
      formValid: false,
    };
  }

  componentDidMount() {
    // // Simple POST request with a JSON body using fetch
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ title: "React POST Request Example" }),
    // };
    // fetch("https://reqres.in/api/posts", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => console.log("data", data));
  }

  isAttendingChange() {
    this.setState((state) => ({ isAttending: !this.state.isAttending }));
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstnameValid = this.state.firstnameValid;
    // let lastnameValid = this.state.lastnameValid;
    // let emailValid = this.state.emailValid;

    switch (fieldName) {
      // case "email":
      //   emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      //   fieldValidationErrors.email = emailValid ? "" : "Email is invalid";
      //   break;
      case "firstname":
        firstnameValid = value.length > 0;
        fieldValidationErrors.firstname = firstnameValid
          ? ""
          : "Please Enter First Name";
        break;
      // case "lastname":
      //   lastnameValid = value.length > 0;
      //   fieldValidationErrors.lastname = lastnameValid
      //     ? ""
      //     : "Please Enter Last Name";
      //   break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        // emailValid: emailValid,
        firstnameValid: firstnameValid,
        // lastnameValid: lastnameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.firstnameValid,
    });
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      message: "Sending...",
      isSubmitted: true,
    });
    await this.sendFormData();
  };

  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      message: "",
      firstname: "",
      lastname: "",
      email: "",
      alert: "",
      isSubmitted: false,
      isAttending: true,
      formErrors: { firstname: "", lastname: "", email: "" },
      firstnameValid: false,
      lastnameValid: false,
      emailValid: false,
      formValid: false,
    });
  };

  sendFormData = async () => {
    // var formData = {
    //   key: this.refs.firstname.value,
    //   // lastname: this.refs.lastname.value,
    //   // email: this.refs.email.value,
    //   // isAttending: this.state.isAttending
    // };
    // console.log(formData);
    // setTimeout(() => {
    //   this.setState({
    //     message: "Submit is sented. Thank you",
    //   });
    // }, 2000);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: this.refs.firstname.value.trim() }),
    };
    fetch(
      "https://csgadmin.com/api/key/60ca2759312463343ef3f7d2",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        this.setState({
          message: "Submit is sented. Thank you",
        });
      })
      .catch((e) => {
        this.setState({
          message: "Submit is not sented. Try again",
        });
      });
  };

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    let alert;
    const isSubmitted = this.state.isSubmitted;

    if (isSubmitted) {
      alert = <div className="alert alert-success">{this.state.message}</div>;
    }

    const FormErrors = ({ formErrors }) => (
      <div className="formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return <p key={i}>*{formErrors[fieldName]}</p>;
          } else {
            return "";
          }
        })}
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            {alert}
            <legend>Key Skin AI</legend>
            <hr />
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form onSubmit={this.handleSubmit}>
              <div
                className={`form-group ${this.errorClass(
                  this.state.formErrors.firstname
                )}`}
              >
                <label htmlFor="firstname">Key Data:</label>
                <input
                  className="form-control"
                  id="firstname"
                  type="text"
                  name="firstname"
                  ref="firstname"
                  value={this.state.firstname}
                  onChange={this.handleUserInput}
                  onBlur={this.handleUserInput}
                />
              </div>
              {/* <div
                className={`form-group ${this.errorClass(
                  this.state.formErrors.lastname
                )}`}
              >
                <label htmlFor="lastname">Last Name:</label>
                <input
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  ref="lastname"
                  type="text"
                  value={this.state.lastname}
                  onChange={this.handleUserInput}
                  onBlur={this.handleUserInput}
                />
              </div>
              <div
                className={`form-group ${this.errorClass(
                  this.state.formErrors.email
                )}`}
              >
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  ref="email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                />
              </div> */}
              {/* <div className="form-check">
                <input
                  id="check"
                  name="check"
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.isAttending}
                  value={this.state.isAttending}
                  onChange={this.isAttendingChange}
                />
                <label htmlFor="check" className="form-check-label">
                  Are you attending?
                </label>
              </div> */}
              <div className="form-group">
                <button
                  disabled={!this.state.formValid}
                  onClick={this.handleSubmit}
                  className="btn btn-primary mt-3"
                >
                  Submit
                </button>
                <button
                  onClick={this.handleReset}
                  className="btn btn-danger mt-3 ml-3"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicForm;
