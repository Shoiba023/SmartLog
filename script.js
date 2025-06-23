function startDictation() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      document.getElementById('text').value = event.results[0][0].transcript;
    };
    recognition.onerror = function(event) {
      alert('Error: ' + event.error);
    };
    recognition.start();
  } else {
    alert("Your browser doesn't support speech recognition.");
  }
}

function submitData() {
  const text = document.getElementById('text').value;
  if (!text) {
    alert("Please speak or enter something first.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzak-WUNhDP9JJasT_1Uwk_ax4zvlRFWGNKoZebegn1sL7yRB3TOibquP6OBPQyC1bgkA/exec", {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ entry: text })
  });

  document.getElementById('status').innerText = "✅ Submitted!";
  document.getElementById('text').value = "";
}
