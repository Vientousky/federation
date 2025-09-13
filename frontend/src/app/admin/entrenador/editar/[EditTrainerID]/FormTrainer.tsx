"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrainerInfo } from "@/app/lib/Entrenador";
import Localidad_chaco from "@/app/data/localidad_chaco.json";
import Provincia from "@/app/data/provincia.json";
import Sexo from "@/app/data/sexo.json";
import Cargo from "@/app/data/entrenador_cargo.json";
import Image from "next/image";
import ImgDrop from "@/app/admin/components/imgDrop/ImgDrop";
import Notification from "@/app/components/notification/Notification";
import styles from "../../trainerForm.module.css";

type TrainerProps = {
  trainer: TrainerInfo;
};

export default function FormTrainer({ trainer }: TrainerProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: trainer.nombre,
    apellido: trainer.apellido,
    sexo: trainer.sexo,
    dni: trainer.dni,
    licencia: trainer.licencia,
    vencimiento: trainer.vencimiento,
    cargo: trainer.cargo,
    provincias: trainer.provincias,
    localidad: trainer.localidad,
    foto_entrenador: trainer.foto_entrenador,
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  async function sendformData(data: typeof formData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/${trainer.id}/`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        setNotification({
          message: "Algo salió mal al editar el entrenador",
          type: "warning",
        });
        return false;
      }

      setNotification({
        message: "Entrenador actualizado exitosamente",
        type: "success",
      });

      return true;
    } catch (error) {
      console.error(error);
      setNotification({ message: "Error de conexión", type: "error" });
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exito = await sendformData(formData);

    if (exito) {
      router.push("/admin/entrenador");
    }
  };

  return (
    <>
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
              <h1 className={styles.title}>
                Licencia de entrenador {trainer.apellido}{" "}
              </h1>
              <p className={styles.subtitle}>Federacion chaqueña boxeo</p>
            </figcaption>
          </figure>

          <section className={styles.licenseForm}>
            <article className={styles.formImg}>
              <ImgDrop
                width={350}
                height={350}
                initialImageUrl={trainer.foto_entrenador}
                onImageUpload={(url) =>
                  setFormData((prev) => ({ ...prev, foto_entrenador: url }))
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
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                    value={formData.apellido}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                    value={formData.sexo}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                    value={formData.dni}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                    value={formData.licencia}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                    value={formData.vencimiento}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                    value={formData.cargo}
                    onChange={(e) =>
                      setFormData((prev) => ({
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
                value={formData.provincias}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    provincias: e.target.value,
                    localidad: "",
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
              {formData.provincias === "CHC" ? (
                <select
                  id="localidad"
                  value={formData.localidad}
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  value={formData.localidad}
                  onChange={(e) => {
                    setFormData((prev) => ({
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
            <button
              type="button"
              className={styles.cancelar}
              onClick={() => router.push("/admin/entrenador")}
            >
              Cancelar
            </button>

            <button type="submit" className={styles.guardar}>
              Guardar cambios
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
    </>
  );
}
