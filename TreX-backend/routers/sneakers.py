from fastapi import APIRouter
from sneaks_connector import buscar_zapatillas_por_nombre

router = APIRouter(
    prefix="/sneakers",
    tags=["sneakers"]
)

@router.get("/")
def obtener_sneakers(nombre: str, limite: int = 5):
    """
    Endpoint para buscar sneakers usando Sneaks-API.
    - nombre: palabra clave para buscar zapatillas.
    - limite: cantidad máxima de resultados.
    """
    resultado = buscar_zapatillas_por_nombre(nombre, limite)
    return resultado
