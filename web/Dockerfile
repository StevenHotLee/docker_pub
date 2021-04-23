# 부모 이미지 지정
FROM node:14
# 작업 디렉토리 생성
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
# 포트 매핑
EXPOSE 5010
# 실행 명령
CMD npm start