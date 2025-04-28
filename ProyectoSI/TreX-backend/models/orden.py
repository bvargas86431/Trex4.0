# models/orden.py

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class ItemOrden(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    orden_id: int = Field(foreign_key="orden.id")
    producto_id: int
    marca: str
    modelo: str
    precio: int
    cantidad: int

    orden: Optional["Orden"] = Relationship(back_populates="items")

class Orden(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int  # Relación futura con tabla Usuario
    total: int
    fecha: datetime = Field(default_factory=datetime.now)

    items: List[ItemOrden] = Relationship(back_populates="orden")
