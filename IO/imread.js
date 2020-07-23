const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED) {

    function ImRead(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        // retrive properties
        node.filepath = config.filepath;
        node.flag = config.flag;
        node.outputFormat = config.outputFormat;
        switch(node.flag) {
            case "IMREAD_UNCHANGED":
                node.flag = cv.IMREAD_UNCHANGED
                break;
            case "IMREAD_GRAYSCALE":
                node.flag = cv.IMREAD_GRAYSCALE
                break;
            case "IMREAD_COLOR":
                node.flag = cv.IMREAD_COLOR
                break;
        }
        node.on('input', function(msg) {
            // If msg.filepath already exist, use it
            if (msg.hasOwnProperty('filepath') === true) {
                node.filepath = msg.filepath
            }
            let img = cv.imread(node.filepath, node.flag)
            msg.payload = utils.prepareImageMsg(img, node.outputFormat)
            node.send(msg);
        })
    }
    RED.nodes.registerType("imread",ImRead);
};

