const cv = require('opencv4nodejs')

let test_img = new cv.Mat(3000, 3000, cv.CV_8UC3, [255, 0, 0]);

const prepareImageMsg = function(MatImage, transform="base64") {
    // Keep all Mat object atributes
    let msg = Object.assign({}, MatImage)
    if (transform === "base64") {
        // Encode image to a base64 string in order transfer image
        msg.image = cv.imencode('.jpg', MatImage).toString('base64');    
    }
    else if (transform === "array") {
        // Transform image to array (slowest way)
        msg.image = MatImage.getDataAsArray()
    }
    else if (transform === "buffer") {
        // Transform image to buffer (fastest way)
        msg.image = MatImage.getData()
    }
    else {
        throw "Please provide a supported transform option (base64, array, buffer)"
    }
    return msg
}

// const readImageMsg = function(msg) {
//     if (typeof msg.image === "string") {

//     }
//     else if (typeof msg.image === "buffer") {


//     }
// }

module.export = prepareImageMsg;
