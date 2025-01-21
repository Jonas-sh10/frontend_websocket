// URL del servidor WebSocket en Render
const socket = new WebSocket('wss://smart-connection.onrender.com');  // Usar wss:// para WebSocket seguro

// Evento cuando se abre la conexión
socket.onopen = () => {
  console.log("Conectado al servidor WebSocket");
  document.getElementById('messages').textContent = "Conectado al servidor WebSocket.";
};

// Evento cuando se recibe un mensaje desde el servidor
socket.onmessage = (event) => {
  console.log("Mensaje del servidor:", event.data);
  displayMessage(event.data);
};

// Evento de error en la conexión WebSocket
socket.onerror = (error) => {
  console.error("Error en WebSocket:", error);
  document.getElementById('messages').textContent = "Error en la conexión WebSocket.";
};

// Evento cuando la conexión se cierra
socket.onclose = () => {
  console.log("Conexión cerrada");
  document.getElementById('messages').textContent = "Conexión cerrada.";
};

// Función para enviar un mensaje al servidor WebSocket
function sendMessage() {
  const message = document.getElementById('messageInput').value;
  
  if (message.trim()) {
    console.log("Enviando mensaje al servidor:", message);
    socket.send(message);
    document.getElementById('messageInput').value = ""; // Limpiar el campo de texto
  }
}

// Función para mostrar los mensajes en la interfaz
function displayMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Desplazar al último mensaje
}
