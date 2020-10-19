function search_query(placeholder) {
  return promise = new Promise(function(resolve, reject) {
    vex.dialog.prompt({
      message: 'Enter search query',
      placeholder: placeholder,
      callback: function(value) {
        if (value) {
          resolve(value);
        } else {
          load_player();
        }
      }
    })
  });
}

function show_alert(message) {
  vex.dialog.confirm({
      unsafeMessage: message,
      callback: function (value) {
          location.reload();
      }
  })
}
