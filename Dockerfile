# 부모 이미지 지정
FROM node:14
# 작업 디렉토리 생성
WORKDIR /usr/app
RUN npm install -g pm2 
COPY . .

RUN cd /usr/app/web && npm install
RUN cd /usr/app/web2 && npm install

# RUN cd /usr/app/web && pm2 start ./bin/www --name web
# RUN cd /usr/app/web2 && pm2 start ./bin/www --name web2

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

# 포트 매핑
EXPOSE 5010 5020
# 실행 명령