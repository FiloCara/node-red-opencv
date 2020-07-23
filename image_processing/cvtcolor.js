const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED) {

    function CvtColor(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.colorspace = config.colorspace;
        node.outputFormat = config.outputFormat;

        switch(node.colorspace) {
            case "BGR2RGB":
                node.colorspace = cv.COLOR_BGR2RGB
                break;
            case "BGR2GRAY":
                node.colorspace = cv.COLOR_BGR2GRAY
                break;
            case "BGR2HLS":
                node.colorspace = cv.COLOR_BGR2HLS
                break;
            case "BGR2HSV":
                node.colorspace = cv.COLOR_BGR2HSV
                break;
            case "RGB2BGR":
                node.colorspace = cv.COLOR_RGB2BGR
                break;
            case "RGB2GRAY":
                node.colorspace = cv.COLOR_RGB2GRAY
                break;
            case "RGB2HLS":
                node.colorspace = cv.COLOR_RGB2HLS
                break;
            case "RGB2HSV":
                node.colorspace = cv.COLOR_RGB2HSV
                break;
            case "GRAY2BGR":
                node.colorspace = cv.COLOR_GRAY2BGR
                break;
        }

        node.on('input', function(msg) {
            
            // Decode img
            let previousImage = utils.readImageMsg(msg.payload)
            // Change color space
            msg.payload = previousImage.cvtColor(node.colorspace)
            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        })
    }
    RED.nodes.registerType("cvtcolor",CvtColor);
};

