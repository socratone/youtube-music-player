const getText = function () {
  return fetch('https://koreanjson.com/posts/1')
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(error => console.log(error));
};

export default getText;