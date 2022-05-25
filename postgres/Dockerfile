FROM postgres:latest

RUN apt-get install tzdata -y
# ENV TZ=Europe/Kiev
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && dpkg-reconfigure -f noninteractive tzdata
# ADD /tables/ /docker-entrypoint-initdb.d/tables/
# ADD /seed/ /docker-entrypoint-initdb.d/seed/
# ADD deploy_schemas.sql /docker-entrypoint-initdb.d/