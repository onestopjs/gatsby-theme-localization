const express = require('express');
const app = express();

const specialCases = [
  {
    regex: /.*locales\/.*\/contact.json/, // for the suspense case
    action: 'throttle'
  }
];

// disgusting mess
app.use((req, __, next) => {
  const special = specialCases.find(specialCase =>
    specialCase.regex.test(req.url)
  );
  if (special) {
    if (special.action === 'throttle') {
      setTimeout(() => {
        next();
      }, 1000);
    } else {
      next();
    }
  } else {
    next();
  }
});
app.use(express.static('./example/public'));

app.listen(42069);
