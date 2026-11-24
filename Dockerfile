ARG NGINX_IMAGE=nginx:1.27-alpine
FROM ${NGINX_IMAGE}

LABEL org.opencontainers.image.title="hz-ai-portal" \
      org.opencontainers.image.description="湖州市人工智能赋能平台（Huzhou AI City Mall）前端服务"

# 清理默认站点与配置，写入生产 Nginx 配置
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 仅复制前端运行所需的静态资源
COPY index.html /usr/share/nginx/html/index.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY data /usr/share/nginx/html/data
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
