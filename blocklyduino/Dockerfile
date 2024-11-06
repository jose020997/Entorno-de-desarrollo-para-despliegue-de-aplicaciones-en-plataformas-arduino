FROM python:3.7
MAINTAINER Zenobia Milla Herrero <zmh0009@red.ujaen.es>

COPY requirements.txt /home/servidor/requiremets.txt
RUN pip install -r /home/servidor/requiremets.txt

WORKDIR /home/servidor/
COPY . /home/servidor/.
CMD python /home/servidor/server.py