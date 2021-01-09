const myFunktion = require('./sum');
|const axios = require ("axios");

test('Pop up a window alert', () => {
  expect(myFunktion(sum.myFunktion)).toBe('Vielen Dank für ihre Nachricht! Wir kümmern uns so schnell wie möglich um dein Anliegen! :)');
});

