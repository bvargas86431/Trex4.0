from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
# database.py

productos = [
    {
        "id": 1,
        "marca": "Nike",
        "modelo": "Air Max 90",
        "precio": 399000,
        "imagen": "/images/nike-airmax90.jpg"
    },
    {
        "id": 2,
        "marca": "Adidas",
        "modelo": "Ultraboost",
        "precio": 420000,
        "imagen": "/images/adidas-ultraboost.jpg"
    }
]

carritos = {
    # user_id: [lista de productos]
    1: [],
}

ordenes = []

DATABASE_URL = "sqlite:///./trex.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()