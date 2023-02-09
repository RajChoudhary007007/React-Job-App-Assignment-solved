import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DetailsItem from '../DetailsItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetailsCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getItemDetail()
  }

  getItemDetail = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const itemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(itemUrl, options)
    if (response.ok) {
      const data = await response.json()
      const newData = data.job_details
      const jobDetails = {
        id: newData.id,
        companyLogoUrl: newData.company_logo_url,
        companyWebsiteUrl: newData.company_website_url,
        employmentType: newData.employment_type,
        jobDescription: newData.job_description,
        lifeAtCompany: newData.life_at_company,
        location: newData.location,
        packagePerAnnum: newData.package_per_annum,
        rating: newData.rating,
        skills: newData.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: newData.title,
      }

      const similarJobsList = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetails,
        similarJobsList,
        apiStatus: apiStatusConstants.success,
      })
      console.log(jobDetails)
      console.log(similarJobsList)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {jobDetails, similarJobsList} = this.state

    return (
      <DetailsItem jobDetails={jobDetails} similarJobsList={similarJobsList} />
    )
  }

  loadingView = () => (
    <div className="loader-container-item">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="job-details">{this.renderJobDetails()}</div>
      </div>
    )
  }
}
export default JobItemDetailsCard
