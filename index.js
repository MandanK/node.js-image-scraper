// ! import the required packages
const https = require('https');
let fs = require('fs');

// ! a general function that gets a url and saves the content (in our case a jpg file) in a local file
function saveImageToDisk(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function (response) {
    response.pipe(file);
  });
}

// ! We use the pictureCounter to create file names, we also use it to manage the number of files that should be saved
var pictureCounter = 0;
var maxNumberOfPictures = 10; // this specifies how many pictures should be saved
var localFolderAddress = '/Users/mandankazzazi/projects/memes/memes/';
var targetURL = 'https://memegen-link-examples-upleveled.netlify.app/';

const Crawler = require('crawler');

const c = new Crawler({
  callback: function (error, res, done) {
    if (error) {
      console.log({ error });
    } else {
      const images = res.$('img');
      images.each((index) => {
        if (pictureCounter < maxNumberOfPictures) {
          {
            // here you can save the file or save them in an array to download them later
            //console.log({
            //src: images[index].attribs.src, // * uncomment for debugging
            //});
            saveImageToDisk(
              images[index].attribs.src,
              localFolderAddress + (pictureCounter + 1) + '.jpg',
            );
            pictureCounter++;
          }
        }
      });
    }
  },
});

c.queue(targetURL);
