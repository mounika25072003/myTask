import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', errorOccurred: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChnagePAssword = event => {
    this.setState({password: event.target.value})
  }

  onSubmiteSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFail = err => {
    this.setState({errorMsg: err, errorOccurred: true})
  }

  onSubmitFrom = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmiteSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitFail(data.error_msg)
    }
  }

  render() {
    const {username, password, errorOccurred, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitFrom}>
          <div className="form-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={this.onChangeUserName}
            placeholder="username"
            id="username"
          />
          <br />
          <br />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={this.onChnagePAssword}
            placeholder="password"
            id="password"
          />
          <br />
          <br />
          <button className="btn" type="submit">
            Login
          </button>
          {errorOccurred && <p className="err">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
