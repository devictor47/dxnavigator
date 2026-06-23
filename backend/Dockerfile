FROM mcr.microsoft.com/dotnet/sdk:9.0

WORKDIR /workspace

ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

CMD ["dotnet", "watch", "run", "--project", "DxNavigator.Api.csproj", "--urls", "http://0.0.0.0:8080"]
