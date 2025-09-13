"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sexo from "@/app/data/sexo.json";
import Provincia from "@/app/data/provincia.json";
import Localidad_chaco from "@/app/data/localidad_chaco.json";
import Cargo from "@/app/data/entrenador_cargo.json";
import ImgDrop from "../../components/imgDrop/ImgDrop";
import Notification from "@/app/components/notification/Notification";
import Image from "next/image";
import styles from "../trainerForm.module.css";

export default function CrearEntrenadorPage() {
  const router = useRouter(); // Hook para navegación

  const [trainerData, setTrainerData] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    dni: "",
    licencia: "",
    vencimiento: "",
    cargo: "",
    provincias: "",
    localidad: "",
    foto_entrenador: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  // Función para enviar datos al backend
  async function enviarDatos(data: typeof trainerData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        setNotification({
          message: "Algo salió mal al crear el Entrenador ",
          type: "warning",
        });
        return false;
      }

      setNotification({
        message: "Entrenador creado exitosamente ",
        type: "success",
      });
      return true;
    } catch (error) {
      console.error(error);
      setNotification({ message: "Error de conexión", type: "error" });
      return false;
    }
  }

  // Enviar y redirigir
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exito = await enviarDatos(trainerData);

    if (exito) {
      router.push("/admin/entrenador");
    }
  };

  // Enviar y limpiar formulario
  const handleSaveAndAddAnother = async () => {
    const exito = await enviarDatos(trainerData);

    if (exito) {
      // Limpiar formulario para agregar otro
      setTrainerData({
        nombre: "",
        apellido: "",
        sexo: "",
        dni: "",
        licencia: "",
        vencimiento: "",
        cargo: "",
        provincias: "",
        localidad: "",
        foto_entrenador: "",
      });
    }
  };

  return (
    <main>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.contentLicense}>
          <figure className={styles.licenseHeader}>
            <Image
            className={styles.logo}
              src="/img/logo.webp"
              alt="fa-cha-box"
              width={65}
              height={46}
            />

            <figcaption className={styles.slema}>
              <h1 className={styles.title}>Licencia de entrenador</h1>
              <p className={styles.subtitle}>Federacion chaqueña boxeo</p>
            </figcaption>
          </figure>

          <section className={styles.licenseForm}>
            <article className={styles.formImg}>
              <ImgDrop
                width={350}
                height={350}
                onImageUpload={(url) =>
                  setTrainerData((prev) => ({ ...prev, foto_entrenador: url }))
                }
              />
            </article>

            <article className={styles.formFields}>

              <section className={styles.fieldsIdentification}>
                <div className={styles.formItem}>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    value={trainerData.nombre}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        nombre: e.target.value,
                      }))
                    }
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.formItem}>
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    value={trainerData.apellido}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        apellido: e.target.value,
                      }))
                    }
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.formItem}>
                  <label htmlFor="sexo">Sexo</label>
                  <select
                    id="sexo"
                    value={trainerData.sexo}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        sexo: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Seleccione un sexo</option>
                    {Sexo.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className={styles.fieldsGeneral}>
                 <div className={styles.formItem}>
                  <label htmlFor="dni">DNI</label>
                  <input
                    type="text"
                    id="dni"
                    value={trainerData.dni}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        dni: e.target.value,
                      }))
                    }
                    maxLength={10}
                    required
                  />
                </div>

                <div className={styles.formItem}>
                  <label htmlFor="licencia">Nº licencia</label>
                  <input
                    type="text"
                    id="licencia"
                    value={trainerData.licencia}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        licencia: e.target.value,
                      }))
                    }
                    maxLength={16}
                    required
                  />
                </div>

                <div className={styles.formItem}>
                  <label htmlFor="vencimiento">Vencimiento</label>
                  <input
                    type="date"
                    id="vencimiento"
                    value={trainerData.vencimiento}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        vencimiento: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className={styles.formItem}>
                  <label htmlFor="cargo">Cargo</label>
                  <select
                    id="cargo"
                    value={trainerData.cargo}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        cargo: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Seleccione un cargo</option>
                    {Cargo.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

            </article>
          </section>

          <section className={styles.licenseLocalities}>
            <article className={styles.formItem}>
              <label htmlFor="provincia">Provincia</label>
              <select
                id="provincia"
                value={trainerData.provincias}
                onChange={(e) =>
                  setTrainerData((prev) => ({
                    ...prev,
                    provincias: e.target.value,
                    localidad: "", // reseteo localidad al cambiar provincia
                  }))
                }
                required
              >
                <option value="">Seleccione una provincia</option>
                {Provincia.map((prov) => (
                  <option key={prov.code} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </article>

            <article className={styles.formItem}>
              <label htmlFor="localidad">Localidades</label>
              {trainerData.provincias === "Chaco" ? (
                <select
                  id="localidad"
                  value={trainerData.localidad}
                  onChange={(e) =>
                    setTrainerData((prev) => ({
                      ...prev,
                      localidad: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Seleccione una localidad</option>
                  {Localidad_chaco.map((dep) => (
                    <optgroup key={dep.departamento} label={dep.departamento}>
                      {dep.localidades.map((loc: string) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="localidad"
                  value={trainerData.localidad}
                  onChange={(e) => {
                    setTrainerData((prev) => ({
                      ...prev,
                      localidad: e.target.value,
                    }));
                  }}
                  placeholder="Ingrese una localidad"
                  required
                />
              )}
            </article>
          </section>

          <footer className={styles.licenseFooter}>
            <button type="submit" className={styles.guardar}>Guardar</button>

            <button type="button" className={styles.agregar} onClick={handleSaveAndAddAnother}>
              Guardar y agrega otro
            </button>
          </footer>
        </div>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </main>
  );
}
