function Respond(code, data, message) {
  this.code = code || 500;
  this.data = data || null;
  this.message = message || null;
}

module.exports = Respond;
