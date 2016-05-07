import FbUtils from 'common/utils/firebase';

const backgroundImageFromCategories = (event) => {

  const path = '/src/assets/images/';
  const prefix = `category_`;
  const imagePath = name => `${path}${prefix}${name}`;
  const imagePaths = paths => paths.map(item => imagePath(item));

  const images = {
    'sports': imagePaths(['sports1.jpg', 'sports1.jpg']),
    'food': imagePaths(['food0.jpg', 'food1.jpg', 'food2.jpg']),
    'learning': imagePaths(['learning0.jpg', 'learning1.jpg', 'learning2.jpg']),
    'noimage': imagePaths(['noimage.jpg', 'noimage1.jpg', 'noimage2.jpg', 'noimage3.jpg'])
  };

  const getRandomImageFromCategory = (imagesList, category) => {
    let rand = Math.floor(Math.random() * imagesList[category].length);

    rand = 0;

    return imagesList[category][rand];
  };

  let image = getRandomImageFromCategory(images, 'noimage');
  let category = null;

  if (event.category) {
    category = event.category;
  }

  if (images[category]) {
    image = getRandomImageFromCategory(images, category);
  }

  return image;

};

export default {
  backgroundImageFromCategories: backgroundImageFromCategories
};
