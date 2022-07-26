const request = require('request')

class GilabService {

    constructor() {
        this.url = process.env.GITLAB_URL
        this.path = process.env.GITLAB_PATH
        this.repository = process.env.GITLAB_REPOSITORY
        this.token = process.env.TOKEN
    }

    createUrlApi(nameFile, extension) {
        const encode = encodeURIComponent(`${this.repository}/${nameFile}.${extension}`)
        return `${this.url}${this.path}${encode}`
    }

    createUrlFile(nameFile, extension) {
        return `${this.url}/daniel199257/repository-image/-/raw/main/repository-image/${nameFile}.${extension}`
    }

    saveFileInGitLab(nameFile, base64, extension) {
        return new Promise((resolve, reject) => {
            const url = this.createUrlApi(nameFile, extension)
            const payload = {
                body: JSON.stringify({
                    branch: "main",
                    author_email: "daniel199257@gmail.com",
                    author_name: "ScriptRunner",
                    encoding: "base64",
                    content: base64,
                    commit_message: `Create file ${nameFile}.${extension}`
                }),
                headers: {
                    "PRIVATE-TOKEN": "glpat-hBZLMYzZAVQysPsh-D52",
                    "Content-Type": 'application/json'
                }
            }

            request.post(url, payload, (error, response, data) => {
                if(!error){
                    if(response.statusCode == 200){
                        return resolve(data)
                    }else[
                        reject(response.statusCode)
                    ]
                }else{
                    reject(error)
                }
            })
        })  
    }
}

module.exports = GilabService