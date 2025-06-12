const API = process.env.NEXT_PUBLIC_BACKEND_URL;

// Apartado de carga dinamica de dato (es decir [ID])
export async function LoadDataDynamic(endpoint: string) {
  const res = await fetch(
    `${API}${endpoint}`
  );
  const data = await res.json();
  return data;
}

// Apartado de carga de dato general

export async function LoadData(endpoint: string) {
  const res = await fetch(`${API}${endpoint}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

//Apartado de Busqueda

export async function FetchSearch(endpoint:string, query:string, page:number){
    const res = await fetch(`${API}${endpoint}?search=${query}&page=${page}`,{
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

//apartado de busqueda



//apartado de pagination



