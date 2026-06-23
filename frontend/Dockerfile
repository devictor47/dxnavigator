FROM node:24-alpine

RUN mkdir -p /workspace

WORKDIR /workspace

ENV NODE_ENV=development

COPY docker-entrypoint.sh /usr/local/bin/dxnavigator-frontend
RUN chmod +x /usr/local/bin/dxnavigator-frontend

EXPOSE 5173

CMD ["dxnavigator-frontend"]
