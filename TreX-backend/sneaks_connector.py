import requests

def buscar_zapatillas_por_nombre(nombre, limite=5):
    url = f"http://localhost:3000/search/{nombre}?limit={limite}"
    res = requests.get(url)

    if res.status_code == 200:
        return res.json()
    else:
        return []
