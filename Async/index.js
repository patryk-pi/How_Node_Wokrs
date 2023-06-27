const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log(err);

  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((data) => {
      console.log(data.body.message);
      fs.writeFile('dog-img.txt', data.body.message, (err) => {
        if (err) return console.log(err);
        console.log('Dog image saved to file');
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});
