import { useEffect, useState } from "react";
import ReflejosChecklist from "../ChecklistComponent/ChecklistComponent";
import SelectPeriodoComponent from "../SelectPeriodoComponent/SelectPeriodoComponent";

import { supabase } from '../../supabaseClient';

function ReflejosPrimerForm({id_bebe}){
    const [message, setMessage] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [periodoGuardado, setPeriodoGuardado] = useState('');

    useEffect(() => {
        if (!id_bebe) return;

        async function fetchReflejos() {
            const { data, error } = await supabase
                .from('reflejos_primer_nivel')
                .select('*')
                .eq('id_bebe', id_bebe)
                .eq('periodo', periodo)
                .single();

            if (error) {
                if (error.code === 'PGRST116' || error.details?.includes('No rows found')) {
                    setPeriodoGuardado('');
                    setReflejos({
                        retraccion_flexora: false,
                        extension_refleja: false,
                        extension_cruzada: false,
                        extension_cruzada_2: false,
                    });
                    console.log("No hay datos previos");
                } else {
                    console.log('Error al cargar datos:', error.message);
                }
            }

            // Si hay datos, actualiza el estado
            if (data) {
                console.log('Datos encontrados')
                setReflejos({
                    retraccion_flexora: data.retraccion_flexora ?? false,
                    extension_refleja: data.extension_refleja ?? false,
                    extension_cruzada: data.extension_cruzada ?? false,
                    extension_cruzada_2: data.extension_cruzada_2 ?? false,
                });
            }
        }

        fetchReflejos();
    }, [id_bebe, periodo]);

    async function saveOrUpdateReflejos(id_bebe, reflejos) {
        if (!periodo) {
            setMessage('Selecciona un periodo antes de guardar');
            return;
        }

        // Verificar si ya hay datos
        const { data, error: fetchError } = await supabase
            .from('reflejos_primer_nivel')
            .select('id_bebe')
            .eq('id_bebe', id_bebe)
            .eq('periodo', periodo)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            setMessage('Error al buscar reflejos:', fetchError.message);
            return;
        }

        if (data && periodo && periodoGuardado) {
            // Ya existen datos, hacer UPDATE
            const { error: updateError } = await supabase
            .from('reflejos_primer_nivel')
            .update(reflejos, periodo)
            .eq('id_bebe', id_bebe)
            .eq('periodo', periodo);

            if (updateError) {
                setMessage('Error al actualizar reflejos:', updateError.message);
            } else {
                setMessage('Reflejos actualizados exitosamente');
            }
        } else {
            // No existen datos, hacer INSERT
            const { error: insertError } = await supabase
            .from('reflejos_primer_nivel')
            .insert([
                {
                id_bebe,
                ...reflejos,
                periodo
                }
            ]);

            if (insertError) {
                setMessage('Error al insertar reflejos:', insertError.message);
            } else {
                setMessage('Reflejos insertados exitosamente');
                setPeriodoGuardado(periodo);
            }
        }
    }
    console.log(id_bebe);

    const [reflejos, setReflejos] = useState({
        retraccion_flexora: false,
        extension_refleja: false,
        extension_cruzada: false,
        extension_cruzada_2: false
    });
    return(
        <>  
            <div>
                <SelectPeriodoComponent opcion={periodo} setOpcion={setPeriodo} apartado={'primero'}/>
                <ReflejosChecklist reflejos={reflejos} setReflejos={setReflejos} />
                <button onClick={() => saveOrUpdateReflejos(id_bebe, reflejos, setMessage)}> Guardar cambios </button>
                <p>{message}</p>
            </div>
            
        </>
    );
}

export default ReflejosPrimerForm;