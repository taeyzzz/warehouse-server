# warehouse-server
warehouse management server express node.js

# Prerequisite
- docker
<https://docs.docker.com/install/linux/docker-ce/ubuntu/>,
<https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04>

# How to setup
1. run docker postgres
```bash
docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

2. run docker pg/admin
```bash
docker run -p 3333:80 --name postgres-admin -e "PGADMIN_DEFAULT_EMAIL=admin" -e "PGADMIN_DEFAULT_PASSWORD=password" --link postgres -d dpage/pgadmin4
```

3. set up database by command
```bash
npm run setup
```

# How to run
```bash
npm start
```
