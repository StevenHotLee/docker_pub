# 부모 이미지 지정
FROM node:14
# 작업 디렉토리 생성
WORKDIR /usr/app
RUN npm install pm2 -g 
COPY . .

RUN cd /user/app/web && npm install && cd /user/app/web2 && npm install

RUN cd /user/app/web && pm2 start ./bin/www --name web
RUN cd /user/app/web2 && pm2 start ./bin/www --name web2

# 포트 매핑
EXPOSE 5010 5020
# 실행 명령