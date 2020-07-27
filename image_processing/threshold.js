const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED) {

    function Threshold(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.method = config.method;
        node.threshType = config.threshType;
        node.outputFormat = config.outputFormat;

        switch(node.method) {
            case "simple":
                node.threshValue = parseInt(config.threshValue)
                node.maxValue = parseInt(config.maxValue)
                node.threshType = utils.stringToOpencvConstant(node.threshType)
                break;
            case "adaptive":
                node.maxValue = parseInt(config.maxValue)
                node.threshType = utils.stringToOpencvConstant(node.threshType)
                node.adaptiveMethod = utils.stringToOpencvConstant(config.adaptiveMethod)
                node.blockSize = parseInt(config.blockSize)
                node.C = parseInt(config.C)
                break;
            case "otsu":
                node.threshValue = parseInt(config.threshValue)
                node.maxValue = parseInt(config.maxValue)
                break;
        }

        node.on('input', function(msg) {
    
            // Decode img
            let previousImage = utils.readImageMsg(msg.payload)

            if (node.method === "simple") {
                msg.payload = previousImage.threshold(node.threshValue, node.maxValue, node.threshType)
            }

            else if (node.method === "adaptive") {
                msg.payload = previousImage.adaptiveThreshold(node.maxValue, node.adaptiveMethod, node.threshType, node.blockSize, node.C)
            }
            else {
                msg.payload = previousImage.threshold(node.threshValue, node.maxValue, cv.THRESH_BINARY+cv.THRESH_OTSU)
            }

            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        })
    }
            RED.nodes.registerType("threshold",Threshold);
}
    

