from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer
from routers import productos, zapatos_mock, carrito, ordenes, auth, usuarios
from models.db import crear_tablas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.include_router(productos.router)
app.include_router(zapatos_mock.router)
app.include_router(carrito.router)
app.include_router(ordenes.router)
app.include_router(auth.router)
app.include_router(usuarios.router)

crear_tablas()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="TreX API",
        version="1.0.0",
        description="API protegida con JWT",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "OAuth2PasswordBearer": {
            "type": "oauth2",
            "flows": {
                "password": {
                    "tokenUrl": "/auth/login",
                    "scopes": {}
                }
            }
        }
    }

    openapi_schema["security"] = [{"OAuth2PasswordBearer": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solicitudes desde cualquier dominio
    allow_credentials=True,
    allow_methods=["*"],  # Permite cualquier método HTTP
    allow_headers=["*"],  # Permite cualquier encabezado
)
