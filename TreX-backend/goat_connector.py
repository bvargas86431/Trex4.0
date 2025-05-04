import json

def cargar_sneakers_goat():
    try:
        # Abrir el archivo JSON
        with open("api.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        sneakers = []
        for item in data["sneakers"]:
            sneaker = {
                "marca": item.get("brand_name", "No disponible"),
                "nombre": item.get("name", "No disponible"),
                "precio": item.get("retail_price_cents", 0) / 100,  # Lo convertimos de centavos a dólares
                "imagen": item.get("main_picture_url") or item.get("grid_picture_url"),
                "tallas": item.get("size_range", [])
            }
            sneakers.append(sneaker)

        return sneakers

    except Exception as e:
        print(f"Error leyendo el JSON de GOAT: {e}")
        return []
