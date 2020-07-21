const cv = require('opencv4nodejs')

module.exports = function(RED){

    function Resize(config){
        RED.nodes.createNode(this, config);
        var node  = this;
        node.on('input', function(msg) {
            // Decode img
            decodedPic = cv.imdecode(Buffer.from(msg.payload,'base64'))

            // Resize picture according to method choosen by the user
            switch(config.method) {
                case "Rescale":
                    node.scaleFactor = config.scaleFactor;
                    msg.payload = decodedPic.rescale(node.scaleFactor)
                case "Resize":
                    node.xSize = config.xSize;
                    node.ySize = config.ySize;
                    msg.payload = decodedPic.resize(node.xSize, node.ySize)
                case "ResizeToMax":
                    node.resizeFactor = config.resizeFactor;
                    msg.payload = decodedPic.resizeToMax(node.resizeFactor)
            }
            // Encode
            msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
            node.send(msg);
        });
    }
    RED.nodes.registerType("resize",Resize);
}