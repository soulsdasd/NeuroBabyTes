import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const UserContext = createContext();

export function UserProviderComponent({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuarioLocal = () => {
      const usuarioGuardado = localStorage.getItem("usuario");
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
        setLoading(false);
        return true;
      }
      return false;
    };

    const fetchUsuario = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Puedes hacer fetch del perfil extendido si quieres
        const { data: perfil } = await supabase
          .from("perfiles")
          .select("*")
          .eq("id_perfil", user.id)
          .single();

        const usuarioData = perfil || user;

        setUsuario(usuarioData);
        localStorage.setItem("usuario", JSON.stringify(usuarioData));
      }
      setLoading(false);
    };

    if (!cargarUsuarioLocal()) {
      fetchUsuario();
    }
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UserContext);
}
