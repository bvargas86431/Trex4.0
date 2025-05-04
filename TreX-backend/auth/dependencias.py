from fastapi import Depends, HTTPException, status, Header, Security
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from models.db import get_session
from models.usuario import Usuario
from sqlmodel import Session

# Esto activa el botón "Authorize" en Swagger UI
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ⛳ Solo sirve para que Swagger detecte que usas seguridad
def fake_security_dependency(token: str = Depends(oauth2_scheme)):
    return

SECRET_KEY = "Kratos230903"
ALGORITHM = "HS256"

def obtener_usuario_actual(authorization: str = Header(...), session: Session = Depends(get_session)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token inválido o no enviado")

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    usuario = session.get(Usuario, user_id)
    if not usuario:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return usuario
