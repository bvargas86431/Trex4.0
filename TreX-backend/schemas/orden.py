from pydantic import BaseModel
from typing import List
from datetime import datetime

class ItemOrdenOutput(BaseModel):
    producto_id: int
    marca: str
    modelo: str
    precio: int
    cantidad: int

    class Config:
        orm_mode = True

class OrdenOutput(BaseModel):
    id: int
    user_id: int
    total: int
    fecha: datetime
    items: List[ItemOrdenOutput]

    class Config:
        orm_mode = True


class ItemOrdenInput(BaseModel):
    producto_id: int
    marca: str
    modelo: str
    precio: int
    cantidad: int

class CrearOrdenInput(BaseModel):
    user_id: int
    items: List[ItemOrdenInput]
