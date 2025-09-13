"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BoxeadorInfo } from "@/app/lib/Boxeador";
import { TrainerInfo } from "@/app/lib/Entrenador";

import Sexo from "@/app/data/sexo.json";
import Estado from "@/app/data/estado.json";
import Peso from "@/app/data/peso.json";
import Postura from "@/app/data/postura.json";
import Provincia from "@/app/data/provincia.json";
import Localidad_chaco from "@/app/data/localidad_chaco.json";
import SelectTrainer from "@/app/admin/components/selectTrainer/selectTrainer";
import ImgDrop from "@/app/admin/components/imgDrop/ImgDrop";
import Notification from "@/app/components/notification/Notification";
import styles from "../../boxerForm.module.css";

type BoxerProps = {
  boxer: BoxeadorInfo;
};

export default function FormBoxer({ boxer }: BoxerProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: boxer.nombre,
    apellido: boxer.apellido,
    dni: boxer.dni,
    sexo: boxer.sexo,
    nacimiento: boxer.nacimiento,
    vencimiento: boxer.vencimiento,
    licencia: boxer.licencia,
    provincias: boxer.provincias,
    localidad: boxer.localidad,
    peso: boxer.peso,
    division: boxer.division,
    estado: boxer.estado,
    altura: boxer.altura,
    alcance: boxer.alcance,
    postura_combate: boxer.postura_combate,
    foto_boxeador: boxer.foto_boxeador,
    entrenador: boxer.entrenador ?? null, //
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const [selectedTrainer, setSelectedTrainer] = useState<TrainerInfo | null>(
    null
  );

  useEffect(() => {
    const fetchTrainer = async () => {
      if (boxer.entrenador) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/${boxer.entrenador}/`
          );
          if (res.ok) {
            const data: TrainerInfo = await res.json();
            setSelectedTrainer(data);
          }
        } catch (err) {
          console.error("Error cargando entrenador:", err);
        }
      }
    };
    fetchTrainer();
  }, [boxer.entrenador]);

  async function sendformData(data: typeof formData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${boxer.id}/`, // 👈 PUT con id
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        setNotification({
          message: "Algo salió mal al editar el Boxeador ",
          type: "warning",
        });
        return false;
      }

      setNotification({
        message: "Boxeador modificado exitosamente ",
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
      router.push("/admin/boxeador");
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.boxerProfileContainer}>
          <header className={styles.containerHead}>
            <h1>
              Modificando al Boxeador {boxer.nombre} {boxer.apellido}{" "}
            </h1>
            <p>Federacion Chaqueña de Box</p>
          </header>
          <section className={styles.containerForm}>
            <article className={styles.formImg}>
              <ImgDrop
                width={200}
                height={300}
                initialImageUrl={boxer.foto_boxeador}
                onImageUpload={(url) =>
                  setFormData((prev) => ({ ...prev, foto_boxeador: url }))
                }
              />
            </article>

            <SelectTrainer
              value={selectedTrainer}
              onChange={(trainer) => {
                setSelectedTrainer(trainer);
                setFormData((prev) => ({ ...prev, entrenador: trainer.id }));
              }}
            />

            <div className={styles.fieldsIdentification}>
              <article className={styles.formItem}>
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
              </article>

              <article className={styles.formItem}>
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
              </article>

              <article className={styles.formItem}>
                <label htmlFor="nacimiento">Nacimiento</label>
                <input
                  id="nacimiento"
                  type="date"
                  value={formData.nacimiento}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nacimiento: e.target.value,
                    }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="DNI">DNI</label>
                <input
                  id="DNI"
                  type="text"
                  value={formData.dni}
                  maxLength={10}
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dni: e.target.value }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  value={formData.sexo}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sexo: e.target.value }))
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
              </article>
            </div>

            <div className={styles.boxerDate}>
              <article className={styles.formItem}>
                <label htmlFor="estado">Estado</label>
                <select
                  name=""
                  id="estado"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      estado: e.target.value,
                    }))
                  }
                >
                  <option value="">Seleccione una Estado</option>
                  {/* jejejje me paso */}
                  {Estado.map((est) => (
                    <option key={est.code} value={est.name}>
                      {est.name}
                    </option>
                  ))}
                </select>
              </article>

              <article className={styles.formItem}>
                <label htmlFor="licencia">Num. licencia</label>
                <input
                  id="licencia"
                  type="text"
                  maxLength={10}
                  value={formData.licencia}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      licencia: e.target.value,
                    }))
                  }
                  required
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="vencimiento">vencimiento LIC</label>
                <input
                  id="vencimiento"
                  type="date"
                  value={formData.vencimiento}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vencimiento: e.target.value,
                    }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="peso">Peso</label>
                <input
                  id="peso"
                  type="number"
                  placeholder="colocar el peso en KILOS"
                  min={0}
                  required
                  value={formData.peso}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, peso: e.target.value }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="division">División</label>
                <select
                  id="division"
                  value={formData.division}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      division: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Selecione un tipo de peso</option>
                  {Peso.map((peso) => (
                    <option key={peso.code} value={peso.name}>
                      {peso.name}
                    </option>
                  ))}
                </select>
              </article>

              <article className={styles.formItem}>
                <label htmlFor="altura">Altura</label>
                <input
                  id="altura"
                  type="number"
                  placeholder="colocar la altura en CM"
                  min={0}
                  required
                  value={formData.altura}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      altura: e.target.value,
                    }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="alcanse">Alcance</label>
                <input
                  id="alcanse"
                  type="number"
                  placeholder="colocar en CM"
                  min={0}
                  required
                  value={formData.alcance}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      alcance: e.target.value,
                    }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="postura">Postura</label>
                <select
                  id="postura"
                  value={formData.postura_combate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      postura_combate: e.target.value,
                    }))
                  }
                >
                  <option value="">Selecione una postura de combate</option>
                  {Postura.map((post) => (
                    <option key={post.code} value={post.name}>
                      {post.name}
                    </option>
                  ))}
                </select>
              </article>
            </div>

            <div className={styles.boxerLocalities}>
              <article className={styles.formItem}>
                <label htmlFor="provincia">Provincia</label>
                <select
                  name=""
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
            </div>
          </section>
          <footer className={styles.containerFooter}>
            <button className={styles.guardar} type="submit">
              Guardar
            </button>

            <button
              type="button"
              className={styles.cancelar}
              onClick={() => router.push("/admin/boxeador")}
            >
              Cancelar
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
