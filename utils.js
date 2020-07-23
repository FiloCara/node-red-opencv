const cv = require('opencv4nodejs');

const prepareImageMsg = function(MatImage, transform="base64") {
    // Keep all Mat object atributes
    let msg = Object.assign({}, MatImage);
    if (transform === "base64") {
        // Encode image to a base64 string in order transfer image
        msg.src = cv.imencode('.jpg', MatImage).toString('base64');
    }
    else if (transform === "array") {
        // Transform image to array (slowest way)
        msg.src = MatImage.getDataAsArray();
    }
    else if (transform === "buffer") {
        // Transform image to buffer (fastest way)
        msg.src = MatImage.getData();
    }
    else {
        throw "Please provide a supported transform option (base64, array, buffer)"
    }
    return msg
}

const readImageMsg = function(msg) {

    let image = null;

    if (assertImageMsg(msg) === true) {

        if (typeof msg.src === "string") {
            image = cv.imdecode(Buffer.from(msg.src,'base64'));
        }
        else if (Buffer.isBuffer(msg.src)) {
            image =  new cv.Mat(msg.src, msg.rows, msg.cols, msg.type);
        }
        else if (Array.isArray(msg.src)) {
            image = new cv.Mat(msg.src, msg.type);
        }
        else {
            throw "Impossible to read image, make sure image src has one of the following data type: base64 string, Buffer or Array";
        }
    }
    else {
        throw "The incoming property is not an image object";
    }
    return image
}

const isSameArray = function(array1, array2) {
    isSame = array1.length === array2.length && array1.every((value, index) => value === array2[index])
    return isSame
}

const assertImageMsg = function(msg) {
    const attributes = [
    'step','elemSize',
    'sizes','empty',
    'depth', 'dims',
    'channels','type',
    'cols','rows','src'
    ];
    let attributesList = Object.getOwnPropertyNames(msg);
    if (isSameArray(attributesList, attributes)) {
        return true;
    }
    else {
        return false;
    }
}

// let msg = null
// let img = new cv.Mat(100, 100, cv.CV_8UC1);
// console.log(Object.getOwnPropertyNames(img))
// console.log(img.type)
// console.time("base64")
// msg = prepareImageMsg(img, "base64")
// msg = readImageMsg(msg)
// console.log(msg.type)
// console.timeEnd("base64")

// console.time("buffer")
// msg = prepareImageMsg(img, "buffer")
// msg = readImageMsg(msg)
// console.log(msg.type)
// console.timeEnd("buffer")

// console.time("array")
// msg = prepareImageMsg(img, "array")
// msg = readImageMsg(msg)
// console.log(msg.type)
// console.timeEnd("array")

module.exports = {
    prepareImageMsg,
    readImageMsg
} 
