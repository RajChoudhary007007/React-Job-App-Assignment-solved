import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    search: '',
    employmentType: '',
    minPackage: '',
  }

  componentDidMount() {
    this.getJobLists()
  }

  getJobLists = async () => {
    const {search, employmentType, minPackage} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJob = data.jobs
      const updateJobList = updatedJob.map(eachList => ({
        id: eachList.id,
        companyLogoUrl: eachList.company_logo_url,
        employmentType: eachList.employment_type,
        jobDescription: eachList.job_description,
        location: eachList.location,
        packagePerAnnum: eachList.package_per_annum,
        rating: eachList.rating,
        title: eachList.title,
      }))
      this.setState({
        jobsList: updateJobList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onEnterSearchInput = event => {
    this.setState({search: event.target.value})
  }

  enterSearchInput = () => {
    this.getJobLists()
  }

  changeEmployment = employmentType => {
    this.setState({employmentType}, this.getJobs)
  }

  changeSalary = minPackage => {
    this.setState({minPackage}, this.getJobs)
  }

  noJobsView = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    const isShowJobsList = jobsList.length > 0

    return isShowJobsList ? (
      <ul>
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} eachJob={eachJob} />
        ))}
      </ul>
    ) : (
      this.noJobsView()
    )
  }

  onClickRetryJobsButton = () => {
    this.getJobLists()
  }

  renderJobsFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="retry-button"
        onClick={this.onClickRetryJobsButton}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  getRenderJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state

    return (
      <div className="Job-details-container">
        <div className="left-container">
          <Profile />
          <hr className="hr-line" />
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmployment={this.changeEmployment}
            changeSalary={this.changeSalary}
          />
        </div>

        <div className="right-container">
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="Search"
              type="search"
              value={search}
              onChange={this.onEnterSearchInput}
            />
            <button
              type="button"
              className="btn-search"
              onClick={this.enterSearchInput}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.getRenderJob()}
        </div>
      </div>
    )
  }
}
export default JobDetails
