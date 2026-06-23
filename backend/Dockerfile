FROM mcr.microsoft.com/dotnet/sdk:9.0

WORKDIR /workspace

ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

COPY docker-entrypoint.sh /usr/local/bin/dxnavigator-backend
RUN chmod +x /usr/local/bin/dxnavigator-backend

EXPOSE 8080

CMD ["dxnavigator-backend"]
