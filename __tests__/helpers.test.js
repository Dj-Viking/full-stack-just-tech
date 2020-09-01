const { format_date, format_plural, format_url } = require('../utils/helpers.js');


test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});

test('format_plural() returns a plural string based on the amount of the singular things of the word', () => {
  expect(format_plural('giraffe', 2)).toBe('giraffes');
  expect(format_plural('cactus', 1)).toBe('cactus');
  expect(format_plural('cactus', 2)).toBe('cacti');
  expect(format_plural('deer', 2)).toBe('deer');
  expect(format_plural('comment', 2)).toBe('comments');
  expect(format_plural('octopus', 2)).toBe('octopuses');
});

test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.coolstuff.com/abcdefg/');
  const url3 = format_url('https://www.google.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('coolstuff.com');
  expect(url3).toBe('google.com');
});