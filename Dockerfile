# ── Stage 1: Build ──
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 + packages/noname 서브모듈 복사
COPY . .

# .env 는 Jenkins credential → workspace 복사로 빌드 컨텍스트에 포함됨
# Vite가 자동으로 .env 의 VITE_* 변수를 번들에 포함
RUN yarn build

# ── Stage 2: Serve ──
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen       80;
    server_name  _;
    root         /usr/share/nginx/html;
    index        index.html;

    gzip             on;
    gzip_types       text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length  256;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /healthz {
        access_log off;
        return 200 'ok';
        add_header Content-Type text/plain;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
