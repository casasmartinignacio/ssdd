## Paso 1: Iniciar broker Mosquitto

```bash
docker run -d --name mosquitto-broker -p 1883:1883 -v ./mosquitto/mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto
```