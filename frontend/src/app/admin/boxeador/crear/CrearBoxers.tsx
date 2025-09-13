"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrainerInfo } from "@/app/lib/Entrenador";
import {
  HiOutlineSave,
  HiOutlineSaveAs,
  HiOutlineFolderAdd,
} from "react-icons/hi";

import Sexo from "@/app/data/sexo.json";
import Estado from "@/app/data/estado.json";
import Peso from "@/app/data/peso.json";
import Postura from "@/app/data/postura.json";
import Provincia from "@/app/data/provincia.json";
import Localidad_chaco from "@/app/data/localidad_chaco.json";
import SelectTrainer from "../../components/selectTrainer/selectTrainer";
import ImgDrop from "../../components/imgDrop/ImgDrop";
import Notification from "@/app/components/notification/Notification";
import styles from "../boxerForm.module.css";

export default function CreateBoxer() {
  const router = useRouter();

  const [selectedTrainer, setSelectedTrainer] = useState<TrainerInfo | null>(
    null
  );
  const [boxerData, setBoxerData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    sexo: "",
    nacimiento: "",
    licencia: "",
    vencimiento: "",
    provincias: "",
    localidad: "",
    peso: "",
    division: "",
    estado: "",
    altura: "",
    alcance: "",
    postura_combate: "",
    foto_boxeador: "",
    entrenador: null as string | null,
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  async function sendBoxerData(data: typeof boxerData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/`,
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
          message: "Algo salió mal al crear el Boxeador ",
          type: "warning",
        });
        return false;
      }

      setNotification({
        message: "Boxeador creado exitosamente ",
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

    const exito = await sendBoxerData(boxerData);

    if (exito) {
      router.push("/admin/boxeador");
    }
  };

  const handleSaveAndAddAnother = async () => {
    const exito = await sendBoxerData(boxerData);

    if (exito) {
      setBoxerData({
        nombre: "",
        apellido: "",
        dni: "",
        sexo: "",
        nacimiento: "",
        licencia: "",
        vencimiento: "",
        provincias: "",
        localidad: "",
        peso: "",
        division: "",
        estado: "",
        altura: "",
        alcance: "",
        postura_combate: "",
        foto_boxeador: "",
        entrenador: null as string | null,
      });
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.boxerProfileContainer}>
          <header className={styles.containerHead}>
            <h1>Creando Nuevo Boxeador</h1>
            <p>Federacion Chaqueña de Box</p>
          </header>

          <section className={styles.containerForm}>
            <article className={styles.formImg}>
              <ImgDrop
                width={200}
                height={300}
                onImageUpload={(url) =>
                  setBoxerData((prev) => ({ ...prev, foto_boxeador: url }))
                }
              />
            </article>

            <SelectTrainer
              value={selectedTrainer}
              onChange={(trainer) => {
                setSelectedTrainer(trainer);
                setBoxerData((prev) => ({ ...prev, trainer: trainer.id }));
              }}
            />

            <div className={styles.fieldsIdentification}>
              <article className={styles.formItem}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={boxerData.nombre}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.apellido}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
                      ...prev,
                      apellido: e.target.value,
                    }))
                  }
                  maxLength={100}
                  required
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="nacimiento">Fecha de nacimiento</label>
                <input
                  id="nacimiento"
                  type="date"
                  value={boxerData.nacimiento}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.dni}
                  maxLength={10}
                  required
                  onChange={(e) =>
                    setBoxerData((prev) => ({ ...prev, dni: e.target.value }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  value={boxerData.sexo}
                  onChange={(e) =>
                    setBoxerData((prev) => ({ ...prev, sexo: e.target.value }))
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
                  value={boxerData.estado}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.licencia}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.vencimiento}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.peso}
                  onChange={(e) =>
                    setBoxerData((prev) => ({ ...prev, peso: e.target.value }))
                  }
                />
              </article>

              <article className={styles.formItem}>
                <label htmlFor="division">División</label>
                <select
                  id="division"
                  value={boxerData.division}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.altura}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.alcance}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.postura_combate}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                  value={boxerData.provincias}
                  onChange={(e) =>
                    setBoxerData((prev) => ({
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
                {boxerData.provincias === "CHC" ? (
                  <select
                    id="localidad"
                    value={boxerData.localidad}
                    onChange={(e) =>
                      setBoxerData((prev) => ({
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
                    value={boxerData.localidad}
                    onChange={(e) => {
                      setBoxerData((prev) => ({
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
            <button type="submit">
              <HiOutlineSave />
              Guardar
            </button>

            <button type="button" onClick={handleSaveAndAddAnother}>
              <HiOutlineSaveAs />
              Guardar y agregar a otro
            </button>

            <button className={styles.btn} disabled>
              <HiOutlineFolderAdd />
              Agregar Combate con boxeador
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
