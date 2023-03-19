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

    getBowelMovements(callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/bowelmovements`)
            .then(response => callback(response.data))
    }

    getBowelMovementById(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/bowelmovements/${id}`)
            .then(response => {
                callback(response.data)
            })
            .catch((err) => {
                console.log(err.response)
            });
    }

    createBowelMovement(bowelMovementData, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/bowelmovements`, bowelMovementData)
            .then((response) => {
                if (response.status === 201) {
                    callback(null)
                }
            })
            .catch((err) => {
                callback(err.response)
            });
    }

    updateBowelMovement(id, bowelMovementData, callback) {
        axios.put(`${process.env.REACT_APP_API_URL}/bowelmovements/${id}`, bowelMovementData)
        .then((response) => {
            if (response.status === 200) {
                callback(null)
            }
        })
        .catch((err) => {
            callback(err.response)
        });
    }

}
export default new dataService()