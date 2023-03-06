import axios from 'axios';

class dataService {

  getColors(callback) {
    axios.get(`${process.env.REACT_APP_API_URL}/colors`)
      .then(response => callback(response.data))
  }

  getStoolTypes(callback) {
    axios.get(`${process.env.REACT_APP_API_URL}/stooltypes`)
    .then(response => callback(response.data))
  }

}
export default new dataService()