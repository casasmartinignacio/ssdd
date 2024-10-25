// Pines
const int ledPin = 18;
const int botonPin = 19;

// Variables
bool estadoLed = false;
bool botonAnterior = HIGH;
unsigned long ultimaLectura = 0; 
const unsigned long debounceTiempo = 50;

void setup() {
  pinMode(ledPin, OUTPUT); 
  pinMode(botonPin, INPUT_PULLUP); 
  digitalWrite(ledPin, LOW);  
  Serial.begin(115200);
}

void loop() {
  bool botonActual = digitalRead(botonPin);

  if (botonActual != botonAnterior && millis() - ultimaLectura > debounceTiempo) {
    ultimaLectura = millis();

    if (botonActual == LOW) {
      estadoLed = !estadoLed;  
      digitalWrite(ledPin, estadoLed ? HIGH : LOW);

      Serial.print("LED ");
      Serial.println(estadoLed ? "ENCENDIDO" : "APAGADO");
    }
  }

  botonAnterior = botonActual;
}