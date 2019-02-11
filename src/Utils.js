const Utils={
  isNumeric(obj) {
    return obj - parseFloat(obj) >= 0;
  },
  getNumeric(s) {
    return s.replace(/\D/g, '');
  }
}

export default Utils
