from fastapi import APIRouter, HTTPException
from models.producto import Producto
from database import productos
from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

# ...GET y POST existentes

@router.put("/productos/{id}", response_model=Producto)
def editar_producto(id: int, datos_actualizados: Producto):
    for index, producto in enumerate(productos):
        if producto["id"] == id:
            productos[index] = datos_actualizados.dict()
            return productos[index]
    raise HTTPException(status_code=404, detail="Producto no encontrado")


@router.delete("/productos/{id}")
def eliminar_producto(id: int):
    for index, producto in enumerate(productos):
        if producto["id"] == id:
            productos.pop(index)
            return {"mensaje": f"Producto con ID {id} eliminado"}
    raise HTTPException(status_code=404, detail="Producto no encontrado")

@router.get("/productos/marca/{marca}", tags=["Productos"])
def obtener_productos_por_marca(marca: str, db: Session = Depends(get_db)):
    productos = db.query(Producto).filter(Producto.marca.ilike(f"%{marca}%")).all()
    if not productos:
        raise HTTPException(status_code=404, detail="No se encontraron productos de esa marca")
    return productos

