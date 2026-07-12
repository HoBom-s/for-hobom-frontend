# ── Build 결과물만 패키징 (Jenkins에서 pnpm build 완료 후) ──
FROM nginx:1.27-alpine

# non-root 실행을 위한 디렉터리 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && touch /var/run/nginx.pid \
 && chown nginx:nginx /var/run/nginx.pid

COPY --chown=nginx:nginx apps/hobom-angel/dist /usr/share/nginx/html

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
    # Consumer surface: animal photos are served from an external object-storage
    # CDN (§9) and the SPA calls the API gateway (§5-2), so img-src/connect-src
    # allow https. TODO: tighten to the specific CDN + gateway origins once the
    # image vendor and gateway host are fixed.
    add_header Content-Security-Policy    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'self';" always;

    # ── Compression ──
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

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
