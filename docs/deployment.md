# Docker Development and Production

DxNavigator uses one base Compose file plus environment-specific overlays.

## Local Development

Development is the default Docker Compose mode because Docker automatically reads `docker-compose.override.yml`.

```bash
docker compose up -d --build
```

This mode uses:

- Vite dev server on port `5173`
- ASP.NET `dotnet watch`
- Source bind mounts for hot reload
- npm and NuGet cache volumes
- PostgreSQL with a persistent Docker volume

## Production-Like Deployment

Use the production overlay when deploying behind a reverse proxy such as Caddy.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

This mode uses:

- Published ASP.NET Core backend
- Static frontend build served by nginx
- nginx proxying `/api` to the backend through the Docker network
- No source bind mounts
- No host backend port by default

The frontend remains the public entrypoint. Caddy can proxy HTTPS traffic to the frontend container host port.

## Environment Files

Copy the template once per machine:

```bash
cp .env.example .env
```

Keep `.env` untracked. Use it for machine-specific values such as ports, bind addresses, database credentials, and OAuth secrets.

For a VPN deployment where Caddy runs on the host, a typical `.env` starts with:

```env
FRONTEND_BIND_ADDRESS=127.0.0.1
FRONTEND_PORT=5173
POSTGRES_BIND_ADDRESS=127.0.0.1
ASPNETCORE_ENVIRONMENT=Production
```

If a host port is already occupied, change only the local `.env` file.

## Current Database Note

`DATABASE_ENSURE_CREATED=true` is currently used so the first PostgreSQL schema can be created without migrations.

This should be replaced by EF Core migrations before treating the deployment as real production.
