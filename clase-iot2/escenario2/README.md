## Paso 1: Iniciar broker Mosquitto

```bash
docker run -d --name mosquitto-broker -p 1883:1883 -v ./mosquitto/mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto
```

## Paso 2: Para ingresar a la terminal del contenedor:
```bash
docker exec -i [id del contenedor] sh   
```

## Paso 3: Una vez adentro
```bash
mosquitto_passwd ./mosquitto/config/passwd usuario1
```

Para eliminar un usuario se puede usar 

 ```bash
mosquitto_passwd -D /etc/mosquitto/passwd usuario1
```