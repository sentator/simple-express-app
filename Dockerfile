FROM node

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

# package will be used for migration service
RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE $PORT

CMD ["npm", "run", "dev"]