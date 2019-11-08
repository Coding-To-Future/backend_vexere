require('dotenv').config()
let mongo_uri;
let secret_key;
let port;
let email;
let password;


// const mongo_cloud_url = process.env.MONGO_STAGING_URL
// const mongo_local_url = process.env.MONGO_LOCAL_URL


switch (process.env.NODE_ENV) {
    case "local":
        mongo_uri = process.env.MONGO_LOCAL_URL
        secret_key = process.env.SECRET_KEY_LOCAL
        port = process.env.PORT_LOCAL
        email = process.env.EMAIL_LOCAL
        password = process.env.PASSWORD_LOCAL
        break;
    case "staging":
        mongo_uri = process.env.MONGO_STAGING_URL
        secret_key = process.env.SECRET_KEY_STAGING
        email = process.env.EMAIL_STAGING
        password = process.env.PASSWORD_STAGING
        break;
    default: break;
}

module.exports = {
    mongo_uri, secret_key, port, email, password
}