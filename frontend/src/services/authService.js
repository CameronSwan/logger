import axios from 'axios';

class authService {

    isAuthenticated() {
        //TODO: Return true if authenticated
        return localStorage.getItem('logger-token') !== null;
    }

    register(credentials, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/users/register`, credentials)
            .then(response => {
                if (response.status === 201) {
                    callback(null)
                }
            })
            .catch(err => {
                callback(err.response)
            })
    }

    login(credentials, callback) {
        //we will post the form data to the API for authentication 
        //fetch or axios
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, credentials)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('logger-token', 'to-be-hashed')
                    callback(null)
                }
            })
            .catch((err) => {
                callback(err.response)
            });
    }

    logout() {
        localStorage.removeItem('logger-token')
    }

    getToken() {
        return localStorage.getItem('logger-token')
    }
}

export default new authService();