from pydantic import BaseModel

class RegistroUsuario(BaseModel):
    nombre: str
    correo: str
    contraseña: str

class LoginUsuario(BaseModel):
    correo: str
    contraseña: str
