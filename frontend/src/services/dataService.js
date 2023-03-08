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

  getSymptoms(callback) {
    axios.get(`${process.env.REACT_APP_API_URL}/symptoms`)
      .then(response => callback(response.data))
  }

  createBowelMovement(bowelMovementData, callback) {
    // axios.post(`${process.env.REACT_APP_API_URL}/bowelmovements`, bowelMovementData)
    // .then((response) => {
    //   if (response.status === 201) {
    //     callback(null)
    //   }
    // })
    // .catch((err) => {
    //   callback(err.response)
    // });
  }

}
export default new dataService()