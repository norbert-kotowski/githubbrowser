import buffer from 'buffer';

class AuthService {
    login(creds, cb){
        var b = new buffer.Buffer(creds.username + ':' + creds.password)
        var encodedAuth = b.toString('base64')
        console.log(encodedAuth);

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encodedAuth
            }
        })
            .then((response) => {
                if(response.status >= 200 && response.status < 300) {
                    return response;
                }
                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }

            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
               return cb({success: true})
            })
            .catch((err) => {
                cb(err)
            })
    }
}

module.exports = new AuthService();