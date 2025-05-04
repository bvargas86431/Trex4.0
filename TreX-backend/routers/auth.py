from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models.usuario import Usuario
from schemas.usuario import RegistroUsuario
from models.db import get_session
from auth.seguridad import encriptar_contraseña


from schemas.usuario import LoginUsuario
from auth.seguridad import verificar_contraseña
from auth.jwt import crear_token
from fastapi import Form

router = APIRouter()


@router.post("/auth/registro")
def registrar_usuario(data: RegistroUsuario, session: Session = Depends(get_session)):
    existe = session.exec(select(Usuario).where(Usuario.correo == data.correo)).first()
    if existe:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    nuevo_usuario = Usuario(
    nombre=data.nombre,
    correo=data.correo,
    contraseña=encriptar_contraseña(data.contraseña)
)

    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)

    return {
        "mensaje": "Usuario registrado exitosamente",
        "usuario_id": nuevo_usuario.id
    }


@router.post("/auth/login")
def login(
    username: str = Form(...), 
    password: str = Form(...), 
    session: Session = Depends(get_session)
):
    usuario = session.exec(select(Usuario).where(Usuario.correo == username)).first()
    if not usuario or not verificar_contraseña(password, usuario.contraseña):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = crear_token({"sub": usuario.id, "correo": usuario.correo})
    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "correo": usuario.correo
        }
    }