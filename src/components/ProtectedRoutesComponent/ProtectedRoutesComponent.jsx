import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function ProtectedRoute({ children }) {
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
            navigate("/login");
        } else {
            setChecking(false);
        }
        }

        checkSession();
    }, [navigate]);

    if (checking) return <div>Cargando...</div>;

    return children;
}