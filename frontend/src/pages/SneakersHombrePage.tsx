import { useEffect, useState } from "react";

interface Producto {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
  imagen: string;
}

export default function SneakersHombrePage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/productos')
      .then(response => response.json())
      .then((data: Producto[]) => {
        const hombres = data.filter(producto => 
          !producto.modelo.toLowerCase().includes("wmns")
        );
        setProductos(hombres);
      })
      .catch(error => console.error('Error cargando productos:', error));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sneakers Hombre</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productos.map(producto => (
          <div key={producto.id} className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
            <img
              src={producto.imagen}
              alt={producto.modelo}
              className="h-64 w-full object-contain p-4"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{producto.marca}</h2>
              <p className="text-gray-700">{producto.modelo}</p>
              <p className="text-yellow-600 font-bold mt-2">${producto.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
