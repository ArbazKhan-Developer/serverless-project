class RequestBo {
    constructor(event){
        this.body = JSON.parse(event?.body)
        this.queryParam = event?.queryStringParameters
    }
}

module.exports = RequestBo;