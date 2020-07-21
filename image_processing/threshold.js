const cv = require('opencv4nodejs')

module.exports = function(RED) {

    function Threshold(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.thresholdValue = config.thresholdValue
        node.maxValue = config.maxValue
        node.method = config.method

        switch(node.method) {
            case "THRESH_BINARY":
                node.method = cv.THRESH_BINARY
                break;
            case "THRESH_BINARY_INV":
                node.method = cv.THRESH_BINARY_INV
                break;
            case "THRESH_TRUNC":
                node.method = cv.THRESH_TRUNC
                break;
            case "THRESH_TOZERO":
                node.method = cv.THRESH_TOZERO
                break;
            case "THRESH_TOZERO_INV":
                node.method = cv.THRESH_TOZERO_INV
                break;
            case "THRESH_OTSU":
                node.method = cv.THRESH_OTSU + cv.THRESH_BINARY
                break;
        }

        node.on('input', function(msg) {
            // Decode img
            decodedPic = cv.imdecode(Buffer.from(msg.payload,'base64'))
            // Apply threshold to binarize image
            msg.payload = decodedPic.threshold(node.thresholdValue, node.maxValue, node.method)
            // Encode
            msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
            node.send(msg);
        });
    }
    RED.nodes.registerType("threshold", Threshold);
};