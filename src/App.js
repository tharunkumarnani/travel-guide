import {Component} from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import './App.css'

const ListTag = styled.li`
  width: 49%;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const TravelItem = props => {
  const {travelDetails} = props
  const {name, imageUrl, description} = travelDetails
  return (
    <ListTag>
      <img src={imageUrl} className="image-style" alt={name} />
      <h1 className="name">{name}</h1>
      <p className="des">{description}</p>
    </ListTag>
  )
}

// Replace your code here
class App extends Component {
  state = {apiStatus: false, travelLists: []}

  componentDidMount() {
    this.getTravelLists()
  }

  getTravelLists = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    const {packages} = data
    const updatePackagesList = packages.map(each => ({
      id: each.id,
      name: each.name,
      description: each.description,
      imageUrl: each.image_url,
    }))
    this.setState({apiStatus: true, travelLists: updatePackagesList})
  }

  render() {
    const {apiStatus, travelLists} = this.state
    return (
      <div className="bg-cont">
        <h1 className="heading">Travel Guide</h1>
        <div className="loader-details">
          {!apiStatus && (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
            </div>
          )}
          {apiStatus && (
            <ul className="travels-list">
              {travelLists.map(each => (
                <TravelItem travelDetails={each} key={each.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
