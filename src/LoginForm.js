/* eslint-disable */
import React from "react";
import { get, isEmpty, set } from "lodash";
// import { Link } from "react-router-dom";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      error: ''
    };
  }

  componentDidMount() {
  }

  onChange = (field, value) => {
    set(this.state, `form.${field}`, value);
    this.setState(this.state);
  };

  VALIDATE_EMAIL = (email) => {
    const EMAIL_PATTERN = /^(([^<>()\\\\.,;:\s@"]+(\.[^<>()\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m;
    return EMAIL_PATTERN.test(email);
  };

  onLogin = (event) => {
    event.preventDefault();
    const { form } = this.state;
    if (
      !isEmpty(form) &&
      get(form, "email", null) &&
      get(form, "password", null)
    ) {
      if (this.VALIDATE_EMAIL(get(form, "email", ""))) {
        this.callRestAPI(WebServiceUrls.LOGIN, "POST", form)
          .then((result) => {
            if (result.data.success) {
              const user = get(result, "data.user", {});
          }
        })
          .catch((err) => {
            let errorMessage = get(err, "response.data.message");
            console.log({ errorMessage });
          });
      } else {
        set(this.state, "error.email", "Please provide valid email-address.");
        this.setState(this.state);
      }
    } else {
      !get(form, "email", null) &&
        set(this.state, `error.email`, "This field is required.");
      !get(form, "password", null) &&
        set(this.state, `error.password`, "This field is required.");
      this.setState(this.state);
    }
  };

  callRestAPI = (url, method, params) => {
    // const options = {
    //   method,
    //   url: url,
    //   data: params
    // };
    // return WebServiceRequest.callWebService(options);
  };

  render() {
    const { form, error } = this.state;
    return (
      <div style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="Login-page form-sepecial">
          <h2>Log In</h2>
            <form>
              <div className="form-group">
                <div className="email-input">
                  <input
                    type="email"
                    id="email"
                    placeholder='Email'
                    className={
                      get(error, "email", null)
                        ? "form-control error-text-field"
                        : "form-control"
                    }
                    onChange={(e) => {
                      this.onChange("email", e.target.value);
                    }}
                    value={get(form, "email", "")}
                    autoComplete="email"
                  />
                  <div className="error-text">{get(error, "email", "")}</div>
                </div>
              </div>
              <div className="form-group">
                <div className="pass-input">
                  <input
                    type="password"
                    id="pwd"
                    placeholder='Password'
                    autoComplete="off"
                    className={
                      get(error, "password", null)
                        ? "form-control error-text-field"
                        : "form-control"
                    }
                    onChange={(e) => {
                      this.onChange("password", e.target.value);
                    }}
                  />
                  <div className="error-text">{get(error, "password", "")}</div>
                </div>
              </div>
              <div className="checkbox">
              </div>
              <button
                type="submit"
                className="btn login-btn"
                onClick={this.onLogin}
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
