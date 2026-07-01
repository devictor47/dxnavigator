FROM node:24-alpine

RUN apk add --no-cache \
    ca-certificates \
    chromium \
    freetype \
    harfbuzz \
    nss \
    ttf-freefont

RUN mkdir -p /workspace

WORKDIR /workspace

ENV NODE_ENV=development
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY docker-entrypoint.sh /usr/local/bin/dxnavigator-frontend
RUN chmod +x /usr/local/bin/dxnavigator-frontend

EXPOSE 5173

CMD ["dxnavigator-frontend"]
