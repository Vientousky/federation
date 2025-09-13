"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./login.module.css";

type Campo = {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const campos: Campo[] = [
    {
      name: "user",
      type: "text",
      placeholder: "Usuario",
      required: true,
      value: user,
      onChange: (e) => setUser(e.target.value),
    },
    {
      name: "pass",
      type: "password",
      placeholder: "Contraseña",
      required: true,
      value: pass,
      onChange: (e) => setPass(e.target.value),
    },
  ];
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
    <main className={styles.container}>
      <section className={styles.login}>
        <h1 className={styles.rightTitle}>Iniciar Sección</h1>
        <form className={styles.rightForm} onSubmit={handleLogin}>
          {campos.map((campo) => (
            <div key={campo.name} className={styles.formItem}>
              <label htmlFor={campo.name}>{campo.placeholder}</label>
              <input
                type={campo.type}
                placeholder={campo.placeholder}
                id={campo.name}
                required
                value={campo.value}
                onChange={campo.onChange}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={estado !== "esperando"}
            className={`
              ${styles.formBtnSubmit} 
              ${
                estado === "esperando"
                  ? styles.esperando
                  : estado === "iniciando"
                  ? styles.verificando
                  : styles.redirigiendo
              }
            `}
          >
            {estado === "esperando" && "Iniciar sesión"}
            {estado === "iniciando" && (
              <div className={styles.sppinerTwoAlt}></div>
            )}
            {estado === "redirigiendo" && "Redirigiendo..."}
          </button>
        </form>
      </section>
    </main>
  );
}
