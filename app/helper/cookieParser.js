function cookieParser(cookie){

const cookieObject = {};

if (cookie) {
    const cookieParts = cookie.split(';');
    for (const part of cookieParts) {
        const [key, value] = part.trim().split('=');
        cookieObject[key] = value;
    }
}
return cookieObject;
}

module.exports = cookieParser;