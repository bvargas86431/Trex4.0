from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer
from routers import productos, zapatos_mock, carrito, ordenes, auth, usuarios
from models.db import crear_tablas
from routers import sneakers
import sneaks_connector
from routers import goat
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


app.include_router(productos.router)
app.include_router(zapatos_mock.router)
app.include_router(carrito.router)
app.include_router(ordenes.router)
app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(sneakers.router)
app.include_router(goat.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambia esto si tu frontend está en otro puerto
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

# Rutas de la API
@app.get("/sneakers")
async def get_sneakers():
    # Lógica para devolver los sneakers
    return {"message": "Aquí están los sneakers"}


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


