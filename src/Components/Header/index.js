import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-app-container">
      <div className="header-home-container">
        <div className="header-item">
          <img
            className=" website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </div>

        <div className="header-list">
          <Link to="/" className="header-item">
            Home
          </Link>
          <Link to="/Jobs" className="header-item">
            Job
          </Link>
        </div>

        <div className="header-list">
          <button className="button" type="button" onClick={onClickLogout}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
