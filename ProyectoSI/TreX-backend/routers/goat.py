import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from models import Producto

router = APIRouter()

@router.get("/productos_goat")
def obtener_productos_goat(db: Session = Depends(get_db)):
    productos = db.query(Producto).all()
    return productos

@router.get("/productos", response_model=list[Producto])
def obtener_todos_los_productos(db: Session = Depends(get_db)):
    productos = db.query(Producto).all()
    return productos

@router.get("/goat_sneakers")
def obtener_sneakers_goat():
    try:
        with open("api.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            sneakers = data.get("sneakers", [])
            return sneakers
    except Exception as e:
        print(f"Error leyendo el JSON de GOAT: {e}")
        return []

@router.post("/guardar_goat_sneakers")
def guardar_sneakers_goat(db: Session = Depends(get_db)):
    try:
        with open("api.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            sneakers = data.get("sneakers", [])
            
            count = 0
            for sneaker in sneakers:
                precio_cents = sneaker.get("retail_price_cents")
                
                if precio_cents is None:
                    continue  # 🚨 Si no tiene precio, lo saltamos
                
                nuevo_producto = Producto(
                    marca=sneaker.get("brand_name", "Desconocida"),
                    modelo=sneaker.get("name", "Modelo desconocido"),
                    precio=precio_cents / 100,
                    imagen=sneaker.get("main_picture_url", "")
                )
                db.add(nuevo_producto)
                count += 1

            db.commit()
            return {"mensaje": f"Se guardaron {count} sneakers exitosamente."}
    except Exception as e:
        print(f"Error leyendo el JSON de GOAT: {e}")
        return {"mensaje": "Error guardando sneakers de GOAT"}

@router.get("/buscar_goat")
def buscar_productos_goat(
    nombre: str,
    orden: str = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    db: Session = Depends(get_db)
):
    query = db.query(Producto).filter(
        Producto.modelo.ilike(f"%{nombre}%") | Producto.marca.ilike(f"%{nombre}%")
    )

    if orden == "precio_asc":
        query = query.order_by(Producto.precio.asc())
    elif orden == "precio_desc":
        query = query.order_by(Producto.precio.desc())
    elif orden == "nombre_asc":
        query = query.order_by(Producto.modelo.asc())

    total = query.count()

    productos = query.offset((page - 1) * limit).limit(limit).all()

    if not productos:
        return {"mensaje": "No se encontraron sneakers que coincidan."}

    return {
        "total_resultados": total,
        "pagina_actual": page,
        "limite": limit,
        "resultados": productos
    }