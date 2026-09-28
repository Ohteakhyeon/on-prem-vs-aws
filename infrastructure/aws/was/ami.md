\# WAS AMI



\## 목적



Auto Scaling으로 생성되는 WAS EC2가 동일한 애플리케이션 환경을

자동으로 구성할 수 있도록 기존 WAS EC2를 기반으로 AMI를 생성



\## AMI에 포함된 구성



\- Rocky Linux 9

\- Node.js 18

\- npm

\- Movie Reservation API

\- movie-api systemd Service

\- Node Exporter

\- 애플리케이션 의존성



\## 생성 기준



기존 WAS EC2에서 다음 항목을 확인한 후 AMI를 생성



```bash

node --version

npm --version

systemctl status movie-api

curl http://localhost:3001/api/health

systemctl status node\_exporter

