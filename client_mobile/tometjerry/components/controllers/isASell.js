function isASell(a) {
  return /(?:\d+,?\d*){1,5}/.test(a);
}

export default isASell;
