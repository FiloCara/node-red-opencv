# node-red-opencv
A Node-red module that wraps some of the functionality of the amazing opencv4nodejs library. The main purpose of this project is to provide an easy way to work with images directly in Node-red. 
This node-red module is currently under development.
## Install
The current node module has been tested only on Ubuntu 18.04 and Windows 10.

Install the module on your node-red directory.

`npm install git+https://github.com/FiloCara/node-red-opencv`

The installation takes several minutes.

If you have trouble installing the opencv4nodes or if you want customize the installation please have a look at the Opencv4nodejs webpage.

## Project Overview

The current module provides multiples nodes where each node wraps one or multiple functions of the opencv4nodejs library.
There are two categories of nodes:
* Input/output nodes
* Image processing nodes

The first category provide a way to read or write images directly from or to the filesystem. In addition, the VideoStream node (which wrap the opencv VideoStream Class) allows user to directly read images from a device.
The second class of nodes could be used to perform some basic image processing such us: colorspace change, blurring, thresholding, ... .  

In opencv4nodejs images are rapresented using a custom Mat object which cannot be directly intrepretated and sent across node-red nodes. In order to overcome this limitation each node return an object with the same attributes of the Mat object as well as the image (`.src` attribute) that can be encoded in three diffrent ways:

* Base64 String
* Buffer
* Array

The Base64 format should be preferred for performances and visualization in a web page. Buffer format allows the fastest encoding. The Array encoding is slow but provides some readble data as output. Each opencv node can independetly return one of the previous formats. The choosen output format impact only the `.src` attributes, the others object atributes does not change.


## Project Structure

* **icons**: folder with custom node icon
* **image_processing**: basic image processing nodes
* **IO**: Input/Output Opencv nodes
* **pictures**: example pictures


## Example

### Read an image from a file and show 