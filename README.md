

## Installation

```bash
$ npm install
```

## Configuration 
```
$ export MONGODB_URI='mongodb+srv://walmart-assessment-backend:nvJHL4ZQMU7b5eh1@cluster0.nvptd.gcp.mongodb.net/walmart-assessment'
$ export MONGODB_PRODUCTS_COLLECTION_NAME=products
```

## Running the app

```bash
# build
$ npm run build

# start service
$ npm run start

# docker image
$ sudo docker run -it -p 3000:3000 -e MONGODB_URI='mongodb+srv://walmart-assessment-backend:nvJHL4ZQMU7b5eh1@cluster0.nvptd.gcp.mongodb.net/walmart-assessment' -e MONGODB_PRODUCTS_COLLECTION_NAME=products camilok14/walmart-assessment-backend
```

## Test

```bash
# unit tests
$ npm run test:unit

# test coverage
$ npm run test:cov

# functional test
$ npm run test:functional

#mutation test
$ npm run test:mutation
```
