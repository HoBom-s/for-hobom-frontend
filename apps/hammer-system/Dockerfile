# ── Build 결과물만 패키징 (Jenkins에서 pnpm build:hammer 완료 후) ──
FROM nginx:1.27-alpine

# non-root 실행을 위한 디렉터리 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && touch /var/run/nginx.pid \
 && chown nginx:nginx /var/run/nginx.pid

COPY --chown=nginx:nginx apps/hammer-system/dist /usr/share/nginx/html/hammer

RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server_tokens off;

server {
    listen       8080;
    server_name  _;
    root         /usr/share/nginx/html;
    index        index.html;

    # ── Security Headers ──
    add_header Strict-Transport-Security   "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options            "SAMEORIGIN"       always;
    add_header X-Content-Type-Options     "nosniff"           always;
    add_header Referrer-Policy            "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy         "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://hobom-system.com; frame-ancestors 'self';" always;

    # ── Compression ──
    gzip             on;
    gzip_types       text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length  256;

    location /hammer/ {
        try_files $uri $uri/ /hammer/index.html;
    }

    location /hammer/assets/ {
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

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
