import axios from 'axios';

class dataService {

  getColors(callback) {
    axios.get(`${process.env.REACT_APP_API_URL}/colors`)
      .then(response => {
        console.log(response.data)
        callback(response.data)
      })
  }
  
}
export default new dataService()