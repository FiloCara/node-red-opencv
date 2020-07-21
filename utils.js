const cv = require('opencv4nodejs')

const prepareImageMsg = function(MatImage) {
    // Keep all Mat object atributes
    let msg = Object.assign({}, MatImage)
    // Encode image to a base64 string in order transfer image
    msg.image = cv.imencode('.jpg', MatImage).toString('base64');
    return msg
}
