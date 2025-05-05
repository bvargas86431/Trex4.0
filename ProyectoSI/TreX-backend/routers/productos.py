import os
import json
from fastapi import APIRouter

router = APIRouter()

# Ruta relativa desde productos.py hasta la raíz donde está el JSON
DATA_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'api.json'))

@router.get("/productos")
def get_productos():
    with open(DATA_PATH, 'r', encoding='utf-8') as file:
        data = json.load(file)

    productos = data.get("sneakers", [])

    productos_filtrados = [
        {
            "name": p.get("name", ""),
            "brand_name": p.get("brand_name", ""),
            "gender": p.get("gender", []),
            "size_range": p.get("size_range", []),
            "price_cop": p.get("price_cop", 0),
            "main_picture_url": p.get("main_picture_url", "")  # Asegúrate de incluir la URL de la imagen
        }
        for p in productos
    ]

    return {"productos": productos_filtrados}
