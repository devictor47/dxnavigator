#!/bin/sh
set -e

dotnet restore DxNavigator.Api.csproj

exec dotnet watch run --project DxNavigator.Api.csproj --urls http://0.0.0.0:8080
