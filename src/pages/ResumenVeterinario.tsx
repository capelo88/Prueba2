import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  helpCircleOutline,
  callOutline,
} from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import "./ResumenVeterinario.css";

interface Params {
  tipo: string;
}

const TIPO_TITULO: any = {
  vacunacion: "Resumen de Vacunación",
  desparasitacion: "Resumen de Desparasitación",
  antipulgas: "Resumen de Antipulgas",
  citas: "Resumen de Citas Veterinarias",
};

const ResumenVeterinario: React.FC = () => {
  const { tipo } = useParams<Params>();
  const history = useHistory();
  const [info, setInfo] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mascotas") || "[]");
    setMascotas(data);

    // Extraer todos los registros del tipo solicitado
    const registros = [];

    data.forEach((mascota: any) => {
      if (mascota[tipo] && mascota[tipo].length > 0) {
        mascota[tipo].forEach((reg: any) => {
          registros.push({
            ...reg,
            nombreMascota: mascota.nombre,
            foto: mascota.foto,
          });
        });
      }
    });

    setInfo(registros);
  }, [tipo]);

  const irContacto = () => history.push("/contactanos");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/menu" />
          </IonButtons>
          <h2 style={{ color: "#fff", marginLeft: "10px" }}>
            {TIPO_TITULO[tipo] || "Resumen"}
          </h2>
        </IonToolbar>
      </IonHeader>

      <IonContent className="fondo">

        {/* FOTO UNA SOLA VEZ SI EXISTE */}
        {mascotas.length > 0 && mascotas[0].foto && (
          <div className="foto-principal">
            <img src={mascotas[0].foto} alt="Mascota" />
          </div>
        )}

        {/* LISTA DE REGISTROS */}
        <div className="contenedor">

          {info.length === 0 ? (
            <p className="sin-info">No hay registros para mostrar.</p>
          ) : (
            info.map((item, i) => (
              <div key={i} className="registro-card">

                <h3 className="titulo-mascota">{item.nombreMascota}</h3>

                {tipo === "vacunacion" && (
                  <>
                    <p><strong>Tipo de vacuna:</strong> {item.tipoVacuna}</p>
                    <p><strong>Dosis:</strong> {item.dosis || "-"}</p>
                    <p><strong>Fecha:</strong> {item.fecha}</p>
                    <p><strong>Notas:</strong> {item.notas || "-"}</p>
                  </>
                )}

                {tipo === "desparasitacion" && (
                  <>
                    <p><strong>Medicamento:</strong> {item.nombreMedicamento}</p>
                    <p><strong>Aplicación:</strong> {item.fecha}</p>
                    <p><strong>Próxima:</strong> {item.fechaProxima || "-"}</p>
                    <p><strong>Notas:</strong> {item.notas || "-"}</p>
                  </>
                )}

                {tipo === "antipulgas" && (
                  <>
                    <p><strong>Medicamento:</strong> {item.nombreMedicamento}</p>
                    <p><strong>Aplicación:</strong> {item.fecha}</p>
                    <p><strong>Próxima:</strong> {item.fechaProxima || "-"}</p>
                    <p><strong>Notas:</strong> {item.notas || "-"}</p>
                  </>
                )}

                {tipo === "citas" && (
                  <>
                    <p><strong>Fecha:</strong> {item.fecha}</p>
                    <p><strong>Hora:</strong> {item.hora}</p>
                    <p><strong>Veterinaria:</strong> {item.veterinaria}</p>
                    <p><strong>Dirección:</strong> {item.direccion || "-"}</p>
                    <p><strong>Notas:</strong> {item.notas || "-"}</p>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="franja-gruesa-inferior">
          <div className="footer-icons">
            <IonIcon icon={helpCircleOutline} className="footer-icon" onClick={irContacto} />
            <IonIcon icon={callOutline} className="footer-icon" onClick={irContacto} />
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ResumenVeterinario;
