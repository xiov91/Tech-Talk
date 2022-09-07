// handlebar 'format_date' helper is a function that returns a vanilla javascript formatted date object example 1/1/2022
// all handlebar helpers have to be registered inside the server.js
module.exports = {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  };