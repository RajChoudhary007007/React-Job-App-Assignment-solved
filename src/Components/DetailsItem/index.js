import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'
import {BiLinkExternal} from 'react-icons/bi'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const DetailsItem = props => {
  const {jobDetails, similarJobsList} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
    lifeAtCompany,
  } = jobDetails

  return (
    <div className="details-item">
      <li className="each-job-details-card">
        <div className="logo-container">
          <img
            alt="job details company logo"
            className="company-logo"
            src={companyLogoUrl}
          />
          <div>
            <h1 className="title-heading">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-wise1-container">
          <div className="item">
            <div className="middle-container">
              <IoLocationSharp className="location-icon" />
              <p className="rating">{location}</p>
            </div>

            <div className="middle-container">
              <IoBagRemoveSharp className="location-icon" />
              <p className="rating">{employmentType}</p>
            </div>
          </div>
          <div className="package">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description-visit-container">
          <h1 className="description">Description</h1>
          <a
            className="acchor-cont"
            rel="noreferrer"
            target="_blank"
            href={companyWebsiteUrl}
          >
            <p className="visit-icon">Visit </p>
            <BiLinkExternal className="visiting-icon" />
          </a>
        </div>
        <p className="description-paragraph">{jobDescription}</p>
        <h1 className="description">Skills </h1>
        <ul className="skill-ul-container">
          {skills.map(eachItem => (
            <Skills skillsItem={eachItem} key={eachItem.name} />
          ))}
        </ul>

        <h1 className="description">Life at Company </h1>
        <div className="life-at-container">
          <p className="para">{lifeAtCompany.description}</p>
          <img alt="life at company" src={lifeAtCompany.image_url} />
        </div>
      </li>
      <h1 className="similar-heading">Similar Jobs </h1>
      <ul className="similar-jobs-container">
        {similarJobsList.map(eachItem => (
          <SimilarJobs eachSimilarJob={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  )
}

export default DetailsItem
