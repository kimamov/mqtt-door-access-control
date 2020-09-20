const url = require('url');


function nameFromQuery(request) {
    const params = url.parse(request.url).params;
    return params.get("username")
}

module.exports = {
    nameFromQuery
}