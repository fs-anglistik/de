# de
## Create image
$ cd /opt/fs-anglistik/source/de/ && git pull
$ meteor npm install
$ meteor build /opt/fs-anglistik/build/de/ --directory
$ cd /opt/fs-anglistik/build/de/bundle && sudo cp /opt/fs-anglistik/source/de/Dockerfile /opt/fs-anglistik/build/de/bundle/
$ docker build -t fs-anglistik/de:latest .

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
