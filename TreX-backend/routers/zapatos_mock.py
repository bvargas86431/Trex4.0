# routers/zapatos_mock.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/zapatos-reales")
def obtener_zapatillas_populares():
    return [
        {
            "id": 1,
            "marca": "Nike",
            "modelo": "Air Max 90",
            "precio": 399000,
            "imagen": "https://static.nike.com/a/images/t_prod/w_960,c_limit,f_auto,q_auto/air-max-90.jpg"
        },
        {
            "id": 2,
            "marca": "Adidas",
            "modelo": "Ultraboost 22",
            "precio": 429000,
            "imagen": "https://assets.adidas.com/images/h_840,f_auto,q_auto/ultraboost.jpg"
        },
        {
            "id": 3,
            "marca": "Puma",
            "modelo": "RS-X",
            "precio": 359000,
            "imagen": "https://images.puma.com/image/upload/rsx.jpg"
        },
        {
            "id": 4,
            "marca": "Nike",
            "modelo": "Air Jordan 1",
            "precio": 529000,
            "imagen": "https://static.nike.com/a/images/t_prod/w_960,c_limit,f_auto/air-jordan-1.jpg"
        },
        {
            "id": 5,
            "marca": "Adidas",
            "modelo": "Forum Low",
            "precio": 389000,
            "imagen": "https://assets.adidas.com/images/h_840,f_auto,q_auto/forum-low.jpg"
        }
    ]
