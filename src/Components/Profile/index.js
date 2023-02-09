import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {
    apiStatus: true,
    profileData: {},
  }

  componentDidMount() {
    this.getProfiles()
  }

  getProfiles = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const profileData = await response.json()
      const data = profileData.profile_details
      const updatedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({profileData: updatedData, apiStatus: false})
    }
  }

  getProfilesList = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <div className="profile-list-container">
          {apiStatus ? (
            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
          ) : (
            this.getProfilesList()
          )}
        </div>
      </>
    )
  }
}
export default Profile
