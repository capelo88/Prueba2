
import React from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { helpCircle, call } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  const history = useHistory();

  const irAInicio = () => {
    history.push("/bienvenido");
  };

  const irAContactanos = () => {
    history.push("/contactanos");
  };

  const irAInformacionMascota = () => {
    history.push("/informacion-mascota");
  };

  const irAAntipulgas = () => {
    history.push("/antipulgas");
  };

  const irACitasVeterinarias = () => {
    history.push("/citas-veterinarias");
  };

  const irAVacunacion = () => {
    history.push("/vacunacion");
  };

  const irADesparasitacion = () => {
    history.push("/desparasitacion");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">
        {/* Franja azul superior */}
        <div className="franja-gruesa-superior">
          {/* Si luego quieres la flecha de regreso, puedes poner aquí un icono y usar irAInicio */}
        </div>

        {/* Contenido principal */}
        <div className="contenedor">
          <h1 className="titulo">📋 Menú Principal</h1>

          {/* Imagen central */}
          <div className="menu-item-centro">
            <img
              src="assets/img/info_mascota.png"
              alt="Información Mascota"
              onClick={irAInformacionMascota}
            />
            <p onClick={irAInformacionMascota}>Información de Mascota</p>
          </div>

          {/* Fila 1 */}
          <div className="fila">
            <div className="menu-item">
              <img
                src="assets/img/vacunacion.png"
                alt="Vacunación"
                onClick={irAVacunacion}
              />
              <p onClick={irAVacunacion}>Vacunación</p>
            </div>

            <div className="menu-item">
              <img
                src="assets/img/desparasitacion.png"
                alt="Desparasitación"
                onClick={irADesparasitacion}
              />
              <p onClick={irADesparasitacion}>Desparasitación</p>
            </div>
          </div>

          {/* Fila 2 */}
          <div className="fila">
            <div className="menu-item">
              <img
                src="assets/img/antipulgas.png"
                alt="Antipulgas"
                onClick={irAAntipulgas}
              />
              <p onClick={irAAntipulgas}>Antipulgas</p>
            </div>

            <div className="menu-item">
              <img
                src="assets/img/citas_veterinarias.png"
                alt="Citas Veterinarias"
                onClick={irACitasVeterinarias}
              />
              <p onClick={irACitasVeterinarias}>Citas Veterinarias</p>
            </div>
          </div>
        </div>

        {/* Franja inferior con iconos */}
        <div className="franja-gruesa-inferior">
          <div className="iconos-inferiores">
            <IonIcon
              className="btn-icon grande"
              icon={helpCircle}
              onClick={irAContactanos}
            />
            <IonIcon
              className="btn-icon grande"
              icon={call}
              onClick={irAContactanos}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
