import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonInput,
  IonTextarea,
  IonAccordion,
  IonAccordionGroup,
  useIonAlert
} from "@ionic/react";

import {
  arrowBack,
  helpCircleOutline,
  callOutline,
  createOutline,
  trashOutline
} from "ionicons/icons";

import { useParams, useHistory } from "react-router-dom";
import "./HistorialVeterinario.css";

type TipoRegistro = "vacunacion" | "desparasitacion" | "antipulgas" | "citas";

interface Registro {
  id?: number;
  tipo?: TipoRegistro;

  tipoVacuna?: string;
  dosis?: string;
  fecha?: string;

  nombreMedicamento?: string;
  fechaProxima?: string;

  hora?: string;
  veterinaria?: string;
  direccion?: string;

  notas?: string;
}

interface RutaParams {
  index: string;
}

const HistorialVeterinario: React.FC = () => {
  const { index } = useParams<RutaParams>();
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const mascotaIndex = Number(index);

  const [mascotas, setMascotas] = useState<any[]>([]);
  const [mascota, setMascota] = useState<any>(null);

  const [showAdd, setShowAdd] = useState({
    vacunacion: false,
    desparasitacion: false,
    antipulgas: false,
    citas: false,
  });

  const [modeloVacunacion, setModeloVacunacion] = useState<Registro>({});
  const [modeloDesparasitacion, setModeloDesparasitacion] = useState<Registro>({});
  const [modeloAntipulgas, setModeloAntipulgas] = useState<Registro>({});
  const [modeloCita, setModeloCita] = useState<Registro>({});

  const [editarIndex, setEditarIndex] = useState<{
    [key in TipoRegistro]?: number | null;
  }>({
    vacunacion: null,
    desparasitacion: null,
    antipulgas: null,
    citas: null,
  });

  /* ===============================
      CARGAR DATOS
  ================================ */
  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("mascotas") || "[]");
    setMascotas(lista);

    const m = lista[mascotaIndex];
    if (!m) return history.push("/informacion-mascota");

    m.vacunacion = m.vacunacion || [];
    m.desparasitacion = m.desparasitacion || [];
    m.antipulgas = m.antipulgas || [];
    m.citas = m.citas || [];

    setMascota(m);
  }, [mascotaIndex, history]);

  const saveMascotas = (nuevo: any) => {
    const copia = [...mascotas];
    copia[mascotaIndex] = nuevo;
    localStorage.setItem("mascotas", JSON.stringify(copia));
    setMascotas(copia);
  };

  const getArray = (tipo: TipoRegistro): Registro[] => {
    if (!mascota) return [];
    return mascota[tipo];
  };

  /* ===================================
     GUARDAR / EDITAR / ELIMINAR
  ==================================== */
  const validarYGuardar = async (
    tipo: TipoRegistro,
    modelo: Registro,
    isEdit = false
  ) => {
    if (tipo === "vacunacion" && (!modelo.tipoVacuna || !modelo.fecha)) {
      return presentAlert({
        header: "Faltan datos",
        message: "Tipo de vacuna y fecha son obligatorios.",
        buttons: ["OK"],
        });

    }

    if (
      (tipo === "desparasitacion" || tipo === "antipulgas") &&
      (!modelo.nombreMedicamento || !modelo.fecha)
    ) {
      return presentAlert({
        header: "Faltan datos",
        message: "Medicamento y fecha son obligatorios.",
        buttons: ["OK"],
        });

    }

    if (tipo === "citas" && (!modelo.fecha || !modelo.hora || !modelo.veterinaria)) {
      return presentAlert({
        header: "Faltan datos",
        message: "Fecha, hora y veterinaria son obligatorios.",
        buttons: ["OK"],
        });

    }

    const arr = getArray(tipo);

    if (!isEdit && arr.length >= 50) {
      return presentAlert({
        header: "Límite alcanzado",
        message: "Máximo 50 registros.",
        buttons: ["OK"],
      });

    }

    if (isEdit && editarIndex[tipo] !== null) {
      arr[editarIndex[tipo] as number] = { ...modelo };
    } else {
      modelo.id = Date.now();
      arr.push({ ...modelo });
    }

    const updated = { ...mascota };
    updated[tipo] = arr;

    saveMascotas(updated);
    setMascota(updated);

    presentAlert({
      header: "Éxito",
      message: "Guardado correctamente.",
      buttons: ["OK"],
    });


    cancelar(tipo);
  };

  const cancelar = (tipo: TipoRegistro) => {
    setShowAdd((p) => ({ ...p, [tipo]: false }));
    setEditarIndex((p) => ({ ...p, [tipo]: null }));

    if (tipo === "vacunacion") setModeloVacunacion({});
    if (tipo === "desparasitacion") setModeloDesparasitacion({});
    if (tipo === "antipulgas") setModeloAntipulgas({});
    if (tipo === "citas") setModeloCita({});
  };

  const editar = (tipo: TipoRegistro, idx: number) => {
    const item = getArray(tipo)[idx];
    if (!item) return;

    if (tipo === "vacunacion") setModeloVacunacion({ ...item });
    if (tipo === "desparasitacion") setModeloDesparasitacion({ ...item });
    if (tipo === "antipulgas") setModeloAntipulgas({ ...item });
    if (tipo === "citas") setModeloCita({ ...item });

    setEditarIndex((p) => ({ ...p, [tipo]: idx }));
    setShowAdd((p) => ({ ...p, [tipo]: true }));
  };

  const eliminar = (tipo: TipoRegistro, idx: number) => {
    const arr = getArray(tipo);
    arr.splice(idx, 1);

    const updated = { ...mascota };
    updated[tipo] = arr;

    saveMascotas(updated);
    setMascota(updated);
  };

  /* ===================================
     RENDER
  ==================================== */

  return (
    <IonPage>
      <IonContent className="fondo">

        {/* BARRA SUPERIOR */}
        <div className="franja-gruesa-superior">
          <IonIcon icon={arrowBack} className="back-icon" onClick={() => history.goBack()} />
          <h1 className="titulo">Historial Veterinario</h1>
        </div>

        <div className="contenedor">

          {/* DATOS DE MASCOTA */}
          {mascota && (
            <div className="info-mascota">
              <div className="foto-cuadro">
                <img src={mascota.foto} alt="foto" />
              </div>
              <div className="datos-mascota">
                <h2>{mascota.nombre}</h2>
                <p>{mascota.especie} • {mascota.raza}</p>
              </div>
            </div>
          )}

          {/* ACORDEONES */}
          <IonAccordionGroup>

            {/* ========== VACUNACIÓN ========== */}
            <IonAccordion value="vacunacion">
              <IonItem slot="header" className="accordion-header">
                <IonLabel>Vacunación</IonLabel>
              </IonItem>

              <div className="accordion-content" slot="content">
                
                {/* LISTA */}
                {getArray("vacunacion").map((reg, i) => (
                  <IonItem key={i}>
                    <IonLabel>
                      <h3><strong>Tipo:</strong> {reg.tipoVacuna}</h3>
                      <p><strong>Dosis:</strong> {reg.dosis || "-"} — <strong>Fecha:</strong> {reg.fecha}</p>
                      {reg.notas && <p><strong>Notas:</strong> {reg.notas}</p>}
                    </IonLabel>

                    <IonButton fill="clear" color="warning" onClick={() => editar("vacunacion", i)}>
                      <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={() => eliminar("vacunacion", i)}>
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))}

                {getArray("vacunacion").length === 0 && (
                  <p className="sin-registro">No hay registros de vacunación.</p>
                )}

                {/* FORMULARIO */}
                {showAdd.vacunacion && (
                  <div className="form-inline">

                    <IonItem>
                      <IonLabel position="stacked">Tipo de vacuna</IonLabel>
                      <IonInput
                        value={modeloVacunacion.tipoVacuna || ""}
                        onIonChange={(e) =>
                          setModeloVacunacion({ ...modeloVacunacion, tipoVacuna: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Dosis</IonLabel>
                      <IonInput
                        value={modeloVacunacion.dosis || ""}
                        onIonChange={(e) =>
                          setModeloVacunacion({ ...modeloVacunacion, dosis: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Fecha</IonLabel>
                      <IonInput
                        type="date"
                        value={modeloVacunacion.fecha || ""}
                        onIonChange={(e) =>
                          setModeloVacunacion({ ...modeloVacunacion, fecha: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Notas</IonLabel>
                      <IonTextarea
                        value={modeloVacunacion.notas || ""}
                        onIonChange={(e) =>
                          setModeloVacunacion({ ...modeloVacunacion, notas: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <div className="actions">
                      <IonButton
                        onClick={() =>
                          validarYGuardar("vacunacion", modeloVacunacion, editarIndex.vacunacion !== null)
                        }
                      >
                        Guardar
                      </IonButton>
                      <IonButton color="medium" onClick={() => cancelar("vacunacion")}>
                        Cancelar
                      </IonButton>
                    </div>
                  </div>
                )}

                {!showAdd.vacunacion && (
                  <IonButton expand="block" onClick={() =>
                    setShowAdd({ ...showAdd, vacunacion: true })
                  }>
                    Agregar vacunación
                  </IonButton>
                )}
              </div>
            </IonAccordion>

            {/* ================================
                DESPARASITACIÓN
            ================================= */}
            <IonAccordion value="desparasitacion">
              <IonItem slot="header" className="accordion-header">
                <IonLabel>Desparasitación</IonLabel>
              </IonItem>

              <div className="accordion-content" slot="content">
                {getArray("desparasitacion").map((reg, i) => (
                  <IonItem key={i}>
                    <IonLabel>
                      <h3><strong>Medicamento:</strong> {reg.nombreMedicamento}</h3>
                      <p>
                        <strong>Aplicación:</strong> {reg.fecha} — 
                        <strong>Próx:</strong> {reg.fechaProxima || "-"}
                      </p>
                      {reg.notas && <p><strong>Notas:</strong> {reg.notas}</p>}
                    </IonLabel>

                    <IonButton fill="clear" color="warning" onClick={() => editar("desparasitacion", i)}>
                      <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={() => eliminar("desparasitacion", i)}>
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))}

                {getArray("desparasitacion").length === 0 && (
                  <p className="sin-registro">No hay registros de desparasitación.</p>
                )}

                {showAdd.desparasitacion && (
                  <div className="form-inline">
                    <IonItem>
                      <IonLabel position="stacked">Medicamento</IonLabel>
                      <IonInput
                        value={modeloDesparasitacion.nombreMedicamento || ""}
                        onIonChange={(e) =>
                          setModeloDesparasitacion({
                            ...modeloDesparasitacion,
                            nombreMedicamento: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Fecha</IonLabel>
                      <IonInput
                        type="date"
                        value={modeloDesparasitacion.fecha || ""}
                        onIonChange={(e) =>
                          setModeloDesparasitacion({
                            ...modeloDesparasitacion,
                            fecha: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Fecha próxima (opcional)</IonLabel>
                      <IonInput
                        type="date"
                        value={modeloDesparasitacion.fechaProxima || ""}
                        onIonChange={(e) =>
                          setModeloDesparasitacion({
                            ...modeloDesparasitacion,
                            fechaProxima: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <div className="actions">
                      <IonButton
                        onClick={() =>
                          validarYGuardar("desparasitacion", modeloDesparasitacion, editarIndex.desparasitacion !== null)
                        }
                      >
                        Guardar
                      </IonButton>
                      <IonButton color="medium" onClick={() => cancelar("desparasitacion")}>
                        Cancelar
                      </IonButton>
                    </div>
                  </div>
                )}

                {!showAdd.desparasitacion && (
                  <IonButton expand="block" onClick={() =>
                    setShowAdd({ ...showAdd, desparasitacion: true })
                  }>
                    Agregar desparasitación
                  </IonButton>
                )}
              </div>
            </IonAccordion>

            {/* ================================
                ANTIPULGAS
            ================================= */}
            <IonAccordion value="antipulgas">
              <IonItem slot="header" className="accordion-header">
                <IonLabel>Antipulgas</IonLabel>
              </IonItem>

              <div className="accordion-content" slot="content">
                {getArray("antipulgas").map((reg, i) => (
                  <IonItem key={i}>
                    <IonLabel>
                      <h3><strong>Medicamento:</strong> {reg.nombreMedicamento}</h3>
                      <p>
                        <strong>Aplicación:</strong> {reg.fecha} — 
                        <strong>Próx:</strong> {reg.fechaProxima || "-"}
                      </p>
                      {reg.notas && <p><strong>Notas:</strong> {reg.notas}</p>}
                    </IonLabel>

                    <IonButton fill="clear" color="warning" onClick={() => editar("antipulgas", i)}>
                      <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={() => eliminar("antipulgas", i)}>
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))}

                {getArray("antipulgas").length === 0 && (
                  <p className="sin-registro">No hay registros de antipulgas.</p>
                )}

                {showAdd.antipulgas && (
                  <div className="form-inline">

                    <IonItem>
                      <IonLabel position="stacked">Medicamento</IonLabel>
                      <IonInput
                        value={modeloAntipulgas.nombreMedicamento || ""}
                        onIonChange={(e) =>
                          setModeloAntipulgas({
                            ...modeloAntipulgas,
                            nombreMedicamento: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Fecha</IonLabel>
                      <IonInput
                        type="date"
                        value={modeloAntipulgas.fecha || ""}
                        onIonChange={(e) =>
                          setModeloAntipulgas({
                            ...modeloAntipulgas,
                            fecha: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Próxima fecha (opcional)</IonLabel>
                      <IonInput
                        type="date"
                        value={modeloAntipulgas.fechaProxima || ""}
                        onIonChange={(e) =>
                          setModeloAntipulgas({
                            ...modeloAntipulgas,
                            fechaProxima: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Notas (opcional)</IonLabel>
                      <IonTextarea
                        value={modeloAntipulgas.notas || ""}
                        onIonChange={(e) =>
                          setModeloAntipulgas({
                            ...modeloAntipulgas,
                            notas: e.detail.value!,
                          })
                        }
                      />
                    </IonItem>

                    <div className="actions">
                      <IonButton
                        onClick={() =>
                          validarYGuardar("antipulgas", modeloAntipulgas, editarIndex.antipulgas !== null)
                        }
                      >
                        Guardar
                      </IonButton>
                      <IonButton color="medium" onClick={() => cancelar("antipulgas")}>
                        Cancelar
                      </IonButton>
                    </div>
                  </div>
                )}

                {!showAdd.antipulgas && (
                  <IonButton expand="block" onClick={() =>
                    setShowAdd({ ...showAdd, antipulgas: true })
                  }>
                    Agregar antipulgas
                  </IonButton>
                )}
              </div>
            </IonAccordion>

            {/* ================================
                CITAS VETERINARIAS
            ================================= */}
            <IonAccordion value="citas">
              <IonItem slot="header" className="accordion-header">
                <IonLabel>Citas Veterinarias</IonLabel>
              </IonItem>

              <div className="accordion-content" slot="content">
                {getArray("citas").map((reg, i) => (
                  <IonItem key={i}>
                    <IonLabel>
                      <h3><strong>Veterinaria:</strong> {reg.veterinaria}</h3>
                      <p>
                        <strong>Fecha:</strong> {reg.fecha} — 
                        <strong>Hora:</strong> {reg.hora}
                      </p>
                      {reg.direccion && <p><strong>Dirección:</strong> {reg.direccion}</p>}
                      {reg.notas && <p><strong>Notas:</strong> {reg.notas}</p>}
                    </IonLabel>

                    <IonButton fill="clear" color="warning" onClick={() => editar("citas", i)}>
                      <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={() => eliminar("citas", i)}>
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))}

                {getArray("citas").length === 0 && (
                  <p className="sin-registro">No hay citas registradas.</p>
                )}

                {showAdd.citas && (
                  <div className="form-inline">
                    <IonItem>
                      <IonLabel position="stacked">Fecha</IonLabel>
                      <IonInput
                        type="date"
                        value={modeloCita.fecha || ""}
                        onIonChange={(e) =>
                          setModeloCita({ ...modeloCita, fecha: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Hora</IonLabel>
                      <IonInput
                        type="time"
                        value={modeloCita.hora || ""}
                        onIonChange={(e) =>
                          setModeloCita({ ...modeloCita, hora: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Veterinaria</IonLabel>
                      <IonInput
                        value={modeloCita.veterinaria || ""}
                        onIonChange={(e) =>
                          setModeloCita({ ...modeloCita, veterinaria: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Dirección (opcional)</IonLabel>
                      <IonInput
                        value={modeloCita.direccion || ""}
                        onIonChange={(e) =>
                          setModeloCita({ ...modeloCita, direccion: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Notas (opcional)</IonLabel>
                      <IonTextarea
                        value={modeloCita.notas || ""}
                        onIonChange={(e) =>
                          setModeloCita({ ...modeloCita, notas: e.detail.value! })
                        }
                      />
                    </IonItem>

                    <div className="actions">
                      <IonButton
                        onClick={() =>
                          validarYGuardar("citas", modeloCita, editarIndex.citas !== null)
                        }
                      >
                        Guardar
                      </IonButton>
                      <IonButton color="medium" onClick={() => cancelar("citas")}>
                        Cancelar
                      </IonButton>
                    </div>
                  </div>
                )}

                {!showAdd.citas && (
                  <IonButton expand="block" onClick={() =>
                    setShowAdd({ ...showAdd, citas: true })
                  }>
                    Agregar cita
                  </IonButton>
                )}
              </div>
            </IonAccordion>

          </IonAccordionGroup>

        </div>

        {/* FRANJA INFERIOR */}
        <div className="franja-gruesa-inferior">
          <div className="footer-icons">
            <IonIcon icon={helpCircleOutline} className="footer-icon" onClick={() => history.push("/contactanos")} />
            <IonIcon icon={callOutline} className="footer-icon" onClick={() => history.push("/contactanos")} />
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default HistorialVeterinario;
