from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from models.db import get_session
from models.orden import Orden, ItemOrden
from schemas.orden import CrearOrdenInput, OrdenOutput
from auth.dependencias import obtener_usuario_actual
from models.usuario import Usuario

router = APIRouter()

# Crear una orden (requiere autenticación)
@router.post("/ordenes")
def crear_orden(
    data: CrearOrdenInput,
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(obtener_usuario_actual)
):
    if not data.items:
        raise HTTPException(status_code=400, detail="La orden no tiene productos")

    total = sum(item.precio * item.cantidad for item in data.items)

    nueva_orden = Orden(user_id=usuario.id, total=total)
    session.add(nueva_orden)
    session.commit()
    session.refresh(nueva_orden)

    for item in data.items:
        item_bd = ItemOrden(
            orden_id=nueva_orden.id,
            producto_id=item.producto_id,
            marca=item.marca,
            modelo=item.modelo,
            precio=item.precio,
            cantidad=item.cantidad
        )
        session.add(item_bd)

    session.commit()

    return {
        "mensaje": "Orden creada con éxito",
        "orden_id": nueva_orden.id,
        "total": total
    }

# Obtener órdenes de un usuario (solo si es el usuario autenticado)
@router.get("/ordenes/me", response_model=List[OrdenOutput])
def obtener_mis_ordenes(
    usuario: Usuario = Depends(obtener_usuario_actual),  # ✅ Ya no necesitas user_id
    session: Session = Depends(get_session)
):
    query = select(Orden).where(Orden.user_id == usuario.id)
    resultados = session.exec(query).all()

    for orden in resultados:
        session.refresh(orden, attribute_names=["items"])

    return resultados
