from sqlmodel import SQLModel, Field
from typing import Optional
from pydantic import BaseModel

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    correo: str
    contraseña: str 

class LoginUsuario(BaseModel):
    correo: str
    contraseña: str