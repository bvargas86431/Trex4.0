from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def encriptar_contraseña(password: str):
    return pwd_context.hash(password)

def verificar_contraseña(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)
