function replaceName(string) {
  return string.replace(/[^\._\-\/*0-9a-z]/ig, '');
}

module.exports = replaceName;
