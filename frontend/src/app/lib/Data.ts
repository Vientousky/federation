/**
 * ------------------------------------------------------------------------------------------------
 *
 * ⚠️ Este archivo contiene las funciones principales para comunircarse con la API
 *
 * 🛠️ Estas funciones estan diseñadas como "CAJAS NEGRAS" para evitar repeticiones continua en el CODIGO
 *
 * ❌ PROHIBIDO MODIFICAR ESTE ARCHIVO (DATA.TS) EN LA RAMA PRINCIPAL DE MI GIT.
 *
 * (👉ﾟヮﾟ)👉 Funcionalidades:
 *
 * LoadDataDynamic: Carga dinamica de los perfiles de ENTRENADOR, BOXEADOR, ETC
 * LoadData: carga todos los datos de los modelos los requeridos por el frontEnd
 * FetchSearch: apartado de busqueda general de la web y pagination simple
 * FetchFilter: Paginación general de la web (offset/limit) para cualquier listado.
 *
 * ATT: VIENTOUSKY
 * ＼(((￣(￣(￣▽￣)￣)￣)))／
 *
 * ------------------------------------------------------------------------------------------------
 */
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

// Lugar de carga de dato general
export async function LoadData(endpoint: string) {
  const res = await fetch(`${API}${endpoint}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

// Lugar de carga dinamica de dato (es decir [ID])
export async function LoadDatadynamic<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API}${endpoint}`);
  if (!res.ok) throw new Error("Error en la carga de datos");
  return res.json();
}

//Apartado de Busqueda
export async function FetchSearch(
  endpoint: string,
  query: string,
  page: number
) {
  const res = await fetch(`${API}${endpoint}?search=${query}&page=${page}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

//apartado de pagination
const ITEMS_PER_PAGE = 4;
export async function FetchInvoicesPages(query: string, endpoint: string) {
  try {
    const rest = await fetch(`${API}${endpoint}/?search=${query}`);
    const data = await rest.json();
    const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (err) {
    console.error("Error al calcular páginas:", err);
    return 0;
  }
}
