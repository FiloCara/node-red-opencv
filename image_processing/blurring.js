const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED) {

    function Blurring(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.method = config.method;
        node.outputFormat = config.outputFormat;

        switch (node.method) {
            case "average":
                node.kSizeCols = parseInt(config.kSizeCols);
                node.kSizeRows = parseInt(config.kSizeRows);
                break;
            case "gaussian":
                node.kSizeCols = parseInt(config.kSizeCols);
                node.kSizeRows = parseInt(config.kSizerOWS);
                node.sigmaX = parseFloat(config.sigmaX);
                node.sigmaY = parseFloat(config.sigmaY);
                break;
            case "median":
                node.kSize = parseInt(config.kSize);
                break;
        }

        node.on('input', function(msg) {
    
            // Decode img
            let previousImage = utils.readImageMsg(msg.payload)

            if (node.method === "average") {
                msg.payload = previousImage.blur(new cv.Size(node.kSizeCols, node.kSizeRows))
            }

            if (node.method === "gaussian") {
                msg.payload = previousImage.gaussianBlur(new cv.Size(node.kSizeCols, node.kSizeRows), node.sigmaX, node.sigmaY)
            }

            else {
                msg.payload = previousImage.medianBlur(node.kSize)
            }

            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        })
    }
            RED.nodes.registerType("blurring",Blurring);
}
