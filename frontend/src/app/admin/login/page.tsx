'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css"
import Image from "next/image";

export default function LoginAdmin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      document.cookie = `token=${data.access}; path=/`;
      router.push("/admin");
    } else {
       alert("Credenciales incorrectas");
    }
  }

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

        <form action="" className={styles.rightForm}>
          <div className={styles.item}>
            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" required onChange={(e) => setUser(e.target.value)}/>
          </div>

          <div className={styles.item}>
            <label htmlFor="contraseña">Contraseña</label>
            <input type="password" id="contraseña" required onChange={(e) => setPass(e.target.value)} />
          </div>

          <button onClick={handleLogin}>Iniciar sesión</button>
        </form>
      </article>
    </section>
  );
}
