const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 🐶');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 🤨');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    console.log(data.body.message);
    return writeFilePro('dog-img.txt', data.body.message);

    // fs.writeFile('dog-img.txt', data.body.message, (err) => {
    //   if (err) return console.log(err);
    //   console.log('Dog image saved to file');
    // });
  })
  .then(() => {
    console.log('Dog image saved to file with a Promise!');
  })
  .catch((error) => {
    console.log(error.message);
  });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) return console.log(err);

//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((data) => {
//       console.log(data.body.message);
//       fs.writeFile('dog-img.txt', data.body.message, (err) => {
//         if (err) return console.log(err);
//         console.log('Dog image saved to file');
//       });
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// });
