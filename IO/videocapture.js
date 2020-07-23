const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED) {
    //TODO Implement a way to stop video streaming
    function VideoCapture(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.device = parseInt(config.device);
        node.outputFormat = config.outputFormat
        var vCap = null;
        node.status({fill:"red",shape:"dot",text:"Not recording"});

        node.on('input', function(msg) {
            // If property start, then start recording
            if (msg.hasOwnProperty('start') === true) {
                node.status({fill:"yellow",shape:"dot",text:"Connecting"});
                vCap = new cv.VideoCapture(node.device);
                vCap.read()
                node.status({fill:"green",shape:"dot",text:"Ready"});
            }
            // If property reset, then close and release capture object
            else if (msg.hasOwnProperty('reset') === true) {
                
                if (vCap !== null) {
                    vCap.release()
                    vCap = null;
                    node.status({fill:"red",shape:"dot",text:"Stopped"});
                }  
            }
            // If input and no 'start' or 'reset', then take a shot
            else {
                if (vCap !== null) {
                    let MatImage = vCap.read();
                    msg.payload = utils.prepareImageMsg(MatImage, node.outputFormat)
                    node.send(msg);
                }
            } 
        })
        node.on('close', function() {
            if (vCap !== null) {
                vCap.release()
                node.status({fill:"red",shape:"dot",text:"Not recording"});
            }
        })
    }
    RED.nodes.registerType("videocapture",VideoCapture);
};