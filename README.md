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

#### Docker Compose
```
$ sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

#### Docker Compose Command Completion

````
$ sudo curl -L https://raw.githubusercontent.com/docker/compose/$(docker-compose version --short)/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose
```

### Install Meteor

```
$ cd ~ && curl https://install.meteor.com/ | sh
```

### Install nginx
$ sudo nano ~/docker-compose.yml

nginx:
  container_name: 'nginx'
  image: 'nginx:1.13.5'
  restart: 'always'
  ports:
    - '80:80'
    - '443:443'
  volumes:
    - '/opt/nginx/conf.d:/etc/nginx/conf.d:ro'
    - '/opt/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro'

$ sudo nano /opt/nginx/conf/nginx.conf

user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    client_max_body_size 500M;
    server_names_hash_bucket_size 64;
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
Install nginx
$ cd ~ && sudo docker-compose up -d


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
