FROM node:14

COPY . /walmart-assessment-backend

WORKDIR /walmart-assessment-backend

EXPOSE 3000

CMD node dist/main