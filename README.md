# CONFIG

 * DB_PASSWORD
 * DB_USERNAME
 * DB_HOST
 * DB_DATABASE
 * SIGNUPS_FORBIDDEN
 * ISSUER_URL url of the backend?

Create certs:
    cd config/secrets
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -sha256 -nodes

