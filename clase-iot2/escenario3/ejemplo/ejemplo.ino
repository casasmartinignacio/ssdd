#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Configuración Wi-Fi
const char* ssid = "tu_red";
const char* password = "tu_contraseña";

// Configuración del broker MQTT
const char* mqtt_server = "broker_ip";
const char* mqtt_user = "usuario1";   // Usuario para autenticación MQTT
const char* mqtt_password = "123456"; // Contraseña para autenticación MQTT

WiFiClient espClient;
PubSubClient client(espClient);

// Pines de sensores y actuadores
const int pressurePin = A0;
const int relayPin = D1;
const int valvePin = D2;

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  pinMode(valvePin, OUTPUT);
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void setup_wifi() {
  delay(10);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado a WiFi");
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  if (String(topic) == "actuators/relay") {
    digitalWrite(relayPin, message == "ON" ? HIGH : LOW);
  } else if (String(topic) == "actuators/valve") {
    digitalWrite(valvePin, message == "OPEN" ? HIGH : LOW);
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conectar al broker MQTT... ");
    
    // Conectar al broker con usuario y contraseña
    if (client.connect("WeMosD1R32", mqtt_user, mqtt_password)) {
      Serial.println("Conectado con éxito");

      // Suscribir a los tópicos relevantes
      client.subscribe("actuators/#");
    } else {
      Serial.print("Error al conectar: ");
      Serial.println(client.state());
      delay(5000); // Reintentar cada 5 segundos
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Leer presión y publicarla en MQTT
  int pressure = analogRead(pressurePin);
  client.publish("sensors/pressure", String(pressure).c_str());

  delay(5000);
}