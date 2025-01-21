// URL del servidor WebSocket
const socket = new WebSocket('wss://smart-connection.onrender.com'); // Cambiar a la URL de Render


// Evento cuando se abre la conexión
socket.onopen = () => {
  console.log("Conexión establecida.");
  displayMessage("Conexión establecida.", "system");
};

// Evento cuando se recibe un mensaje desde el servidor
socket.onmessage = (event) => {
  const reader = new FileReader();

  // Leer el contenido del Blob como texto
  reader.onload = () => {
    const message = reader.result; // El texto del mensaje
    console.log("Mensaje del servidor:", message);
    displayMessage(`Otra persona: ${message}`, "received"); // Mostrar el mensaje recibido
  };

  // Procesar el mensaje como Blob
  reader.readAsText(event.data);
};

// Evento de error en la conexión WebSocket
socket.onerror = (error) => {
  console.error("Error en WebSocket:", error);
  displayMessage("Error en la conexión WebSocket.", "error");
};

// Evento cuando la conexión se cierra
socket.onclose = () => {
  console.log("Conexión cerrada.");
  displayMessage("Conexión cerrada.", "system");
};

// Función para enviar un mensaje al servidor WebSocket
function sendMessage() {
  const message = document.getElementById('messageInput').value;

  if (message.trim()) {
    console.log("Enviando mensaje al servidor:", message);
    socket.send(message);
    displayMessage(`Tú: ${message}`, "sent"); // Mostrar el mensaje enviado
    document.getElementById('messageInput').value = ""; // Limpiar el campo de texto
  }
}

// Función para mostrar los mensajes en la interfaz
function displayMessage(message, type) {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');

  // Agregar una clase diferente para cada tipo de mensaje
  newMessage.textContent = message;
  newMessage.classList.add("message"); // Clase base
  if (type) {
    newMessage.classList.add(type); // Clase específica: "sent", "received", "system", "error"
  }

  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Desplazar al último mensaje
}
