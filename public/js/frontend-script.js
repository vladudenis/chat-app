const socket = io();

$(document).ready(() => {
  const $checkinModal = $('#checkinModal');
  const $checkinForm = $('#checkinForm');
  const $checkinInput = $('#checkinInput');
  let username = '';

  $checkinModal.modal('show');
  $checkinForm.on('submit', function(e){
    e.preventDefault();
    if($checkinInput.val()) {
      username = $checkinInput.val();
      $checkinModal.modal('hide');
    }
  });

  const $messages = $('#messages');
  const $form = $('#form');
  const $input = $('#input');

  // Submitting the form emits a message to the HTTP server through a socket
  $form.on('submit', function(e) {
    e.preventDefault();
    if ($input.val()) {
      socket.emit('msg', $input.val());
      $input.val('');
    }
  });

  // Receive an emitted message from the HTTP server and render it to the HTML document
  socket.on('message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    $messages.append(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});
