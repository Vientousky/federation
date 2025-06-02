"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./login.module.css";
import Image from "next/image";

export default function LoginAdmin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [estado, setEstado] = useState<
    "esperando" | "iniciando" | "redirigiendo"
  >("esperando");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("iniciando");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      setEstado("redirigiendo");
      document.cookie = `token=${data.access}; path=/`;
      router.push("/admin");
    } else {
      setEstado("esperando");
      alert("Credenciales incorrectas");
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("token="));
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  return (
    <section className={styles.adminLogin}>
      <figure className={styles.login_left}>
        <Image
          src="/img/baner.png"
          alt="imagen del login"
          width={320}
          height={400}
        />
      </figure>

      <article className={styles.login_right}>
        <div className={styles.rightPrecentacion}>
          <h1>Ante de empezar Inicie Seción</h1>
        </div>

        <form action="" className={styles.rightForm} onSubmit={handleLogin}>
          <div className={styles.item}>
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              required
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={estado !== "esperando"}
            className={`
              ${styles.buttonEstado} 
              ${estado === "esperando"
                ? styles.esperando
                : estado === "iniciando"
                ? styles.iniciando
                : styles.redirigiendo
            }
            `}
          >
            {estado === "esperando" && "Iniciar sesión"}
            {estado === "iniciando" && (
              <>
              Iniciando sesión
              <span></span>
              <span></span>
              <span></span>
              </>
            )}
            {estado === "redirigiendo" && (
              <>
              Secion iniciadad redirigiendo a admin

              <span>✔</span>
              </>
            )}
          </button>
        </form>
      </article>
    </section>
  );
}
