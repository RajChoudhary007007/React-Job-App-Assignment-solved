import Header from '../Header'
import JobDetails from '../JobDetails'
import './index.css'

const Job = () => (
  <div className="main-container">
    <Header />
    <div className="job-home-container">
      <JobDetails />
    </div>
  </div>
)
export default Job
