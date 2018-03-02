# de
## Server Startup

### Update Server

```
$ sudo apt-get update -y && sudo apt-get upgrade -y
```

### Install Docker

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce
$ sudo usermod -aG docker ${USER}
```
### Install Docker Compose
### Install Meteor

```
$ cd ~ && curl https://install.meteor.com/ | sh
```

## Create image

```
$ cd /opt/fs-anglistik/source/de/ && git pull
$ meteor npm install
$ meteor build /opt/fs-anglistik/build/de/ --directory
$ cd /opt/fs-anglistik/build/de/bundle && sudo cp /opt/fs-anglistik/source/de/Dockerfile /opt/fs-anglistik/build/de/bundle/
$ docker build -t fs-anglistik/de:latest .
```

## Start container
$ nano ~/docker-compose.yml
  
fs-anglistik_de:
  container_name: fs-anglistik_de
  image: 'fs-anglistik/de:latest'
  restart: always
  links:
    - 'fs-anglistik_mongo_prod'
  environment:
    - ROOT_URL=https://fs-anglistik.de
    - MONGO_URL=mongodb://fs-anglistik_mongo_prod/

$ cd ~ && docker-compose up -d 
