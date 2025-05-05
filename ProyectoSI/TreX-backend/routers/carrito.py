from fastapi import APIRouter, Depends, HTTPException
from models.producto import Producto
from models.usuario import Usuario
from auth.dependencias import obtener_usuario_actual

router = APIRouter()
carritos = {}

@router.get("/carrito/{user_id}")
def ver_carrito(
    user_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual)
):
    if usuario.id != user_id:
        raise HTTPException(status_code=403, detail="No tienes permiso para ver este carrito")
    return carritos.get(user_id, [])

@router.post("/carrito/{user_id}/agregar")
def agregar_al_carrito(
    user_id: int,
    producto_id: int,
    cantidad: int = 1,
    usuario: Usuario = Depends(obtener_usuario_actual)
):
    from models.producto import productos  # lista simulada
    if usuario.id != user_id:
        raise HTTPException(status_code=403, detail="No puedes modificar este carrito")

    producto = next((p for p in productos if p["id"] == producto_id), None)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    if user_id not in carritos:
        carritos[user_id] = []

    for item in carritos[user_id]:
        if item["producto_id"] == producto_id:
            item["cantidad"] += cantidad
            return item

    nuevo_item = {
        "producto_id": producto_id,
        "marca": producto["marca"],
        "modelo": producto["modelo"],
        "precio": producto["precio"],
        "cantidad": cantidad
    }

    carritos[user_id].append(nuevo_item)
    return nuevo_item

@router.put("/carrito/{user_id}/cantidad")
def modificar_cantidad(
    user_id: int,
    producto_id: int,
    cantidad: int,
    usuario: Usuario = Depends(obtener_usuario_actual)
):
    if usuario.id != user_id:
        raise HTTPException(status_code=403, detail="No puedes modificar este carrito")

    if cantidad <= 0:
        raise HTTPException(status_code=400, detail="La cantidad debe ser mayor a 0")

    carrito = carritos.get(user_id, [])
    for item in carrito:
        if item["producto_id"] == producto_id:
            item["cantidad"] = cantidad
            return item

    raise HTTPException(status_code=404, detail="Producto no está en el carrito")

@router.delete("/carrito/{user_id}/eliminar")
def eliminar_del_carrito(
    user_id: int,
    producto_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual)
):
    if usuario.id != user_id:
        raise HTTPException(status_code=403, detail="No puedes modificar este carrito")

    carrito = carritos.get(user_id, [])
    for item in carrito:
        if item["producto_id"] == producto_id:
            carrito.remove(item)
            return {"mensaje": f"Producto {producto_id} eliminado del carrito"}

    raise HTTPException(status_code=404, detail="Producto no está en el carrito")

@router.get("/carrito/{user_id}/total")
def total_carrito(
    user_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual)
):
    if usuario.id != user_id:
        raise HTTPException(status_code=403, detail="No tienes permiso para ver este carrito")

    carrito = carritos.get(user_id, [])
    total = sum(item["precio"] * item["cantidad"] for item in carrito)
    return {"total": total}


