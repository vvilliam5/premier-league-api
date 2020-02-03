FROM node:carbon

WORKDIR /usr/src/premier-league-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]