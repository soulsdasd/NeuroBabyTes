import { useEffect, useState } from "react";
import styles from "./BabyData.module.css";
import { FaBaby } from "react-icons/fa";
import { supabase } from "../../supabaseClient";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function BabyData() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [bebes, setBebes] = useState([]);
  const [nombre_bebe, setNombreBebe] = useState("");
  const [meses_bebe, setMesesBebe] = useState("");
  const [peso_bebe, setPesoBebe] = useState("");
  const [estatura_bebe, setEstaturaBebe] = useState("");
  const [genero, setGenero] = useState("");
  const [mensaje, setMensaje] = useState("");

  const goTest = (idBebe) => {
    navigate(`/Test/${idBebe}`);
  };

  async function fetchBebes() {
    const { data, error } = await supabase
      .from("bebe")
      .select("*")
      .order("id_bebe", { ascending: true });

    if (error) {
      console.log("Error al obtener datos de la tabla bebe: ", error);
    } else {
      setBebes(data);
    }
  }

  useEffect(() => {
    fetchBebes();
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setMensaje("Error al obtener el usuario: " + error.message);
      return;
    }
    // Verificamos que data y user existan
    if (data && data.user) {
      const userId = data.user.id;
      console.log(userId);
      const { error: insertError } = await supabase
        .from("bebe")
        //Cambiar despues la UUIDD de id_mama
        .insert([
          {
            id_mama: "f7791547-8842-4adf-a40e-b21aaaec3c63",
            nombre_bebe: nombre_bebe,
            meses_bebe: meses_bebe,
            peso_bebe: peso_bebe,
            estatura_bebe: estatura_bebe,
          },
        ]);

      if (insertError) {
        setMensaje(`Error al insertar en la tabla: ${insertError.message}`);
      } else {
        setMensaje("Registro exitoso. Revisa tu correo para confirmar.");
      }
    } else {
      setMensaje("Registro fallido. Intenta de nuevo.");
    }
    await fetchBebes();
    setIsOpen(false);
  };
  return (
    <>
      <div className={styles.containerHeader}>
        <div className={styles.logo}>NeuroBaby</div>
        <div className={styles.navLinks}>
          <button className={styles.btnmain} onClick={() => navigate("/Home")}>
            Inicio
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/Instrucciones")}>
            Instrucciones
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/babyData")}>
            Test
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/Resultados")}>
            Resultados
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/Contactanos")}>
            Contactanos
          </button>
        </div>
      </div>

      <div className={styles.mainContainer}>
        {bebes.map((bebe, index) => (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.cardHeader}>
              {bebe.genero === "masculino" ? (
                <FaBaby
                  size={40}
                  style={{ color: "#A7D7F9", marginBottom: "10px" }}
                />
              ) : (
                <FaBaby
                  size={40}
                  style={{ color: "#f3acdf", marginBottom: "10px" }}
                />
              )}
              <h3>{bebe.nombre_bebe}</h3>
            </div>
            <div className={styles.cardBody}>
              <h4>Meses: {bebe.meses_bebe}</h4>
              <p>Peso: 5.2 kg</p>
              <p>Estatura: 30 cm</p>
              <button
                className={styles.addButton}
                onClick={() => goTest(bebe.id_bebe)}>
                Agregar Registro
              </button>
            </div>
          </div>
        ))}
        <button className={styles.buttonAdd} onClick={handleOpen}>
          +
        </button>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Formulario Bebé</DialogTitle>

          <DialogContent>
            <form id="babyForm" onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                value={nombre_bebe}
                onChange={(e) => setNombreBebe(e.target.value)}
                required
              />
              <TextField
                label="Edad (meses)"
                type="number"
                fullWidth
                margin="normal"
                value={meses_bebe}
                onChange={(e) => setMesesBebe(e.target.value)}
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Peso (kg)"
                fullWidth
                margin="normal"
                value={peso_bebe}
                onChange={(e) => setPesoBebe(e.target.value)}
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Estatura (cm)"
                fullWidth
                margin="normal"
                value={estatura_bebe}
                onChange={(e) => setEstaturaBebe(e.target.value)}
                required
                inputProps={{ min: 0 }}
              />
              <FormLabel>Genero</FormLabel>
              <RadioGroup
                name="planeacion"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}>
                <div className={styles.radioContainer}>
                  <FormControlLabel
                    value="masculino"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="femenino"
                    control={<Radio />}
                    label="Femenino"
                  />
                </div>
              </RadioGroup>
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} className={styles.cancelButton}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="babyForm"
              variant="contained"
              color="primary"
              className={styles.submitButton}>
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles.messageContainer}>
        <p>{mensaje}</p>
      </div>

      <div className={styles.containerend}>
        <p>
          <b className={styles.text}>
            NeuroBabyTest <br />
          </b>
          Empoderar a los padres con conocimiento
        </p>
        <div className={styles.navLinks}>
          <a>Politicas de Privacidad</a>
          <a>Politicas de Servicio</a>
          <a>Soporte</a>
        </div>
      </div>
    </>
  );
}
