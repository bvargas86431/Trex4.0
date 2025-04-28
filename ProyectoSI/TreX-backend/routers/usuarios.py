from fastapi import APIRouter, Depends
from models.usuario import Usuario
from auth.dependencias import obtener_usuario_actual

router = APIRouter()

@router.get("/usuarios/me")
def obtener_mi_perfil(usuario: Usuario = Depends(obtener_usuario_actual)):
    return {
        "id": usuario.id,
        "nombre": usuario.nombre,
        "correo": usuario.correo
    }
