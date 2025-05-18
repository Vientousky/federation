"use client";

import { useState } from "react";
import BoxerImgDrop from "./boxerImgDrop";
import styles from "./createBoxer.module.css";

export default function CreateBoxer() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    status: "",
    dni: "",
    sexo: "",
    fecha_nacimiento: "",
    numero_licencia: "",
    nacionalidad: "",
    provincia: "",
    localidad: "",
    debutaje: "",
    carrera: "",
    peso: "",
    divicion: "",
    altura: "",
    alcance: "",
    stance: "",
    foto: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("Respuesta del backend:", data);
  };

  return (
    <>
      <h1 className={styles.title}>
        Sea bienvenido a la creación del boxeador
      </h1>
      <form onSubmit={handleSubmit}>
        <section className={styles.boxer}>
          <BoxerImgDrop onImageUpload={(url) => setFormData((prev) => ({ ...prev, foto: url }))} />

          <div className={styles.boxerTrainer}>
            <h1>+</h1>
          </div>

          <div className={styles.boxerStance}>
            <div className={styles.inputGroup}>
              <article className={styles.inputField}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  maxLength={100}
                  required
                />
              </article>

              <article className={styles.inputField}>
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
            </div>

            <div className={styles.selectGroup}>
              <label htmlFor="estado">Estado de Boxeador</label>
              <select
                id="estado"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                required
              >
                <option value="" >-------</option>
                <option value="Activo" selected>Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Retirado">Retirado</option>
              </select>
            </div>
          </div>

          <div className={styles.boxerDate}> 
            <article className={styles.Date_item}>
              <label>DNI</label>
              <input
                type="text"
                value={formData.dni}
                maxLength={10}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dni: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Sexo</label>
              <select
                required
                value={formData.sexo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sexo: e.target.value }))
                }
              >
                <option value="" >-------</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </article>

            <article className={styles.Date_item}>
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fecha_nacimiento: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Num. licencia</label>
              <input
                type="text"
                maxLength={10}
                required
                value={formData.numero_licencia}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    numero_licencia: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Nacionalidad</label>
              <input
                type="text"
                maxLength={100}
                required
                value={formData.nacionalidad}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nacionalidad: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Provincia</label>
              <input
                type="text"
                maxLength={50}
                required
                value={formData.provincia}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    provincia: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Localidad</label>
              <input
                type="text"
                maxLength={150}
                required
                value={formData.localidad}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    localidad: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Carrera</label>
              <input
                type="date"
                value={formData.carrera}
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    carrera: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Debutaje</label>
              <input
                type="date"
                required
                value={formData.debutaje}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    debutaje: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Peso</label>
              <input
                type="number"
                value={formData.peso}
                step={0.1}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, peso: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>División</label>
              <select
                value={formData.divicion}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, divicion: e.target.value }))
                }
              >
                <option value="" >-----</option>
                <option value="Peso Mosca">Mosca</option>
                <option value="Peso Gallo">Gallo</option>
                <option value="Peso Pluma">Pluma</option>
                <option value="Peso Ligero">Ligero</option>
                <option value="Peso Walter">Walter</option>
                <option value="Peso Medio">Medio</option>
                <option value="Peso Supermedio">Supermedio</option>
                <option value="Peso Semipesado">Semipesado</option>
                <option value="Peso Crucero">Crucero</option>
                <option value="Peso Pesado">Pesado</option>
              </select>
            </article>

            <article className={styles.Date_item}>
              <label>Altura</label>
              <input
                type="number"
                value={formData.altura}
                step={0.1}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, altura: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Alcance</label>
              <input
                type="number"
                value={formData.alcance}
                step={0.1}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, alcance: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Postura</label>
              <select
                value={formData.stance}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stance: e.target.value }))
                }
              >
                <option value="">-------</option>
                <option value="Ortodoxo">Ortodoxo</option>
                <option value="Zurdo">Zurdo</option>
                <option value="Switch">Switch</option>
              </select>
            </article>
          </div>

          <div className={styles.siguiente}>
            <button className={styles.btn} type="submit">
              Siguiente
            </button>
          </div>
        </section>
      </form>
    </>
  );
}
