//SJSU CMPE 138 Spring2020 TEAM7
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login, adminLogin } from "./loginAction";
import { fakeAuth, history } from "../../Routes";
import "./index.scss";
import { fetchFromObject, setDeep } from "../../utils/utilityFunctions";
import Input from "../../components/Input";
import Logo from "../../assets/images/logo.jpg";
import BackgroundImage from "../../assets/images/background.jpg";

// import BackGround from '../../assets/images/bg.jpg';

export class Login extends Component {
  state = {
    redirectToReferrer: false,
    user: "operator",
    formConfig: {
      email: {
        type: "text",
        value: "",
        validation: false,
        isRequired: true,
        label: "Email",
        requiredFieldMessage: "Email is required.",
        // acceptPattern: /^[A-Za-z0-9]+$/,
        // acceptPatternMessage: "Only A-Z and a-z are acceptable.",
        // validatePattern: /^[A-Za-z0-9]{3,50}$/,
        // validatePatternMessage:
        // "Please enter 3 to 50 characters. Only A-Z and a-z are acceptable.",
        maxLength: 50,
        // label: "First Name *",
        name: "email",
      },
      password: {
        type: "password",
        value: "",
        validation: false,
        isRequired: true,
        label: "Password",
        requiredFieldMessage: "Password is required.",
        // acceptPattern: /^[A-Za-z0-9]+$/,
        // acceptPatternMessage: "Only A-Z and a-z are acceptable.",
        // validatePattern: /^[A-Za-z0-9]{3,50}$/,
        // validatePatternMessage:
        //   "Please enter 3 to 50 characters. Only A-Z and a-z are acceptable.",
        maxLength: 50,
        // label: "First Name *",
        name: "password",
      },
    },
  };

  componentDidMount() {
    if (this.props.auth.loginData && fakeAuth.isAuthenticated) {
      this.setState({ redirectToReferrer: true });
    }
  }

  onInputChange = (key, value) => {
    let formConfig = { ...this.state.formConfig };
    let FieldData = fetchFromObject(formConfig, key);
    FieldData.value = value;
    FieldData.validation = false;
    formConfig = setDeep(formConfig, key, FieldData, true);
    this.setState({ formConfig });
  };
  validateForm = (rootPath = "") => {
    let isValid = true;
    let obj = {};
    const keys = rootPath
      ? Object.keys(fetchFromObject(this.state.formConfig, rootPath))
      : Object.keys(this.state.formConfig);
    let { formConfig } = this.state;
    keys.forEach((item) => {
      let path = rootPath ? rootPath + "." + item : item;
      let fetchedObject = fetchFromObject(formConfig, path);
      if (fetchedObject instanceof Object) {
        if (fetchedObject instanceof Array) {
          fetchedObject.forEach((arrayitem, index) => {
            let arraypath = path + "." + index;
            const isobjValid = this.validateForm(arraypath);
            obj[item] = isobjValid.obj;
            if (isValid && !isobjValid.isValid) {
              isValid = isobjValid.isValid;
            }
          });
        } else {
          if (fetchedObject.value !== undefined) {
            obj[item] = fetchedObject.value;
            if (!fetchedObject.value && fetchedObject.isRequired) {
              fetchedObject.validation = fetchedObject.requiredFieldMessage;
            } else if (
              fetchedObject.value &&
              fetchedObject.validatePattern &&
              !fetchedObject.validatePattern.test(fetchedObject.value)
            ) {
              fetchedObject.validation = fetchedObject.validatePatternMessage;
            }
            if (fetchedObject.validation) {
              isValid = false;
              console.log(path);
              formConfig = setDeep(formConfig, path, fetchedObject, true);
              this.setState({ formConfig });
            }
          } else {
            const isobjValid = this.validateForm(path);
            obj[item] = isobjValid.obj;
            if (isValid && !isobjValid.isValid) {
              isValid = isobjValid.isValid;
            }
          }
        }
      }
    });

    return { isValid, obj };
  };
  login = (e) => {
    e.preventDefault();
    const isFormValid = this.validateForm();

    if (isFormValid.isValid) {
      const { user } = this.state;
      if (user == "operator") {
        this.props.login(isFormValid.obj, () => {
          fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
          });
        });
      } else {
        this.props.adminLogin(isFormValid.obj, () => {
          fakeAuth.authenticate(() => {
            history.push('/adminDashboard')
          });
        });
      }
    }
  };
  updateUser = (e) => {
    this.setState({ user: e.target.value });
  };

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: `/Dashboard` },
    };
    let { redirectToReferrer, user } = this.state;
    const { email, password } = this.state.formConfig;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div
        className="loginpage"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* <img src={BackGround}/> */}
        <form onSubmit={this.login}>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <img src={Logo} style={{ width: "30%" }} alt="T-Genius" />
          </div>
          {/* <label className="maintitle text-center">Login</label> */}
          <div className="loginforminn">
            <Input {...email} onChange={this.onInputChange} />
            <Input {...password} onChange={this.onInputChange} />
            <input
              type="radio"
              name="user"
              value={"operator"}
              checked={user == "operator"}
              onChange={this.updateUser}
            />
            <label>Operator</label>
            <input
              type="radio"
              name="user"
              value={"admin"}
              checked={user == "admin"}
              onChange={this.updateUser}
            />
            <label>Admin</label>

            <button type="submit" className="commonbtn">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data, callback) => {
      dispatch(login(data, callback));
    },
    adminLogin: (data, callback) => {
      dispatch(adminLogin(data, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
