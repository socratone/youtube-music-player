const ENV = 'development';

let url;
if (ENV === 'production') {
  url = '';
} else {
  url = 'http://localhost:4000';
}

export {
  url
};
