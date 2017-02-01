import im from 'imagemagick';
import inquirer from 'inquirer';

/**
im.convert(['-size', '128x128', 'xc:#ff0000', 'test.jpg'], (err, stdout) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stdout);
  }
});
*/

const createImageMagickParams = (params) => {
  const {
    outputFileName,
    font,
    size,
    text,
    textColor,
    backgroundColor
  } = params;
  return [
    '-size',
    size,
    `xc:${backgroundColor}`,
    outputFileName
  ];
};

const emptyValidator = (name) => {
  if (!name) return 'Empty input!';
  return true;
};

const imageSizeValidator = (size) => {
  if (!size) return 'Empty input!';
  const sizes = size.split('x').map((s) => parseInt(s));
  const width = sizes[0];
  const height = sizes[1];
  if (!Number.isInteger(width) || !Number.isInteger(height)) return 'Input [width(Integer)]x[height(Integer)].';
  return true;
}

/**
 * type: create image with strings
 *
 */
const createImageQuestions = [
  {
    type: 'input',
    name: 'outputFileName',
    message: 'Input new image file name',
    validate: emptyValidator
  },
  {
    type: 'input',
    name: 'imageSize',
    message: 'Input image size',
    default: '128x128',
    validate: imageSizeValidator
  },
  {
    type: 'list',
    name: 'outputFileType',
    message: 'Select image file type',
    choices: ['jpg', 'png']
  },
  {
    type: 'input',
    name: 'embedText',
    message: 'Input string that embed in image',
    validate: emptyValidator
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Input text color code for image',
    "default": '#000000'
  },
  {
    type: 'input',
    name: 'backgroundColor',
    message: 'Input background color code for image',
    "default": '#ffffff'
  },
  {
    type: 'input',
    name: 'font',
    message: 'Input font name for text',
    "default": 'Meiryo'
  }
];

inquirer.prompt(createImageQuestions)
  .then((answer) => console.log(answer));
