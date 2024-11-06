#Imagen que queremos utilizar en esta caso python
FROM python:3.7

#Copiamos las dependencias que queremos utilizar en el contenedor
#Utiliza un formato COPY <Ruta local> <Ruta en el contenedor>
COPY requirements.txt /home/servidor/requiremets.txt

#Instalamos las dependencias dentro del contenedor
RUN pip install -r /home/servidor/requiremets.txt

#Establecemos el directorio de trabajo
WORKDIR /home/servidor/

#Copiamos los archivos dentro del contenedor en este caso todos los
#de la carpeta en los cuales se encuentra el fichero Docker
COPY . /home/servidor/.

#Comando que utilizamos al desplegar el contenedor
CMD python /home/servidor/server.py

