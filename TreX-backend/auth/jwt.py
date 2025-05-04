from datetime import datetime, timedelta
from jose import JWTError, jwt

# Clave secreta para firmar tokens
SECRET_KEY = "Kratos230903" 
ALGORITHM = "HS256"
EXPIRACION_MINUTOS = 60

def crear_token(data: dict):
    datos = data.copy()
    expiracion = datetime.utcnow() + timedelta(minutes=EXPIRACION_MINUTOS)
    datos.update({"exp": expiracion})
    token = jwt.encode(datos, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verificar_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
