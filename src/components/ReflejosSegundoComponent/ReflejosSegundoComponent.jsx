import { useEffect, useState } from "react";
import ReflejosChecklist from "../ChecklistComponent/ChecklistComponent";
import SelectPeriodoComponent from "../SelectPeriodoComponent/SelectPeriodoComponent";

import { supabase } from '../../supabaseClient';

function ReflejosSegundoForm({id_bebe}){
    const [message, setMessage] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [periodoGuardado, setPeriodoGuardado] = useState('');

    useEffect(() => {
        if (!id_bebe) return;

        async function fetchReflejos() {
            const { data, error } = await supabase
                .from('reflejos_segundo_nivel')
                .select('*')
                .eq('id_bebe', id_bebe)
                .eq('periodo', periodo)
                .single();

            if (error) {
                if (error.code === 'PGRST116' || error.details?.includes('No rows found')) {
                    setPeriodoGuardado('');
                    setReflejos({
                        tonico: false,
                        tonico_simetrico_cuello: false,
                        tonico_simetrico_cuello_2: false,
                        tonico_laberintico_decubito_supino: false,
                        tonico_laberintico_decubito_prono: false,
                        reaccion_apoyo_positivo: false,
                        reaccion_apoyo_negativo: false
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
                    tonico: data.tonico ?? false,
                    tonico_simetrico_cuello: data.tonico_simetrico_cuello ?? false,
                    tonico_simetrico_cuello_2: data.tonico_simetrico_cuello_2 ?? false,
                    tonico_laberintico_decubito_supino: data.tonico_laberintico_decubito_supino ?? false,
                    tonico_laberintico_decubito_prono: data.tonico_laberintico_decubito_prono ?? false,
                    reaccion_apoyo_positivo: data.reaccion_apoyo_positivo ?? false,
                    reaccion_apoyo_negativo: data.reaccion_apoyo_negativo ?? false,
                });
            }
        }

        fetchReflejos();
    }, [id_bebe, periodo]);

    async function saveOrUpdateReflejos(id_bebe, reflejos, setMessage) {

        // Verificar si ya hay datos
        const { data, error: fetchError } = await supabase
            .from('reflejos_segundo_nivel')
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
            .from('reflejos_segundo_nivel')
            .update(reflejos, periodo)
            .eq('id_bebe', id_bebe);

            if (updateError) {
                setMessage('Error al actualizar reflejos:', updateError.message);
            } else {
                setMessage('Reflejos actualizados exitosamente');
            }
        } else {
            // No existen datos, hacer INSERT
            const { error: insertError } = await supabase
            .from('reflejos_segundo_nivel')
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
        tonico: false,
        tonico_simetrico_cuello: false,
        tonico_simetrico_cuello_2: false,
        tonico_laberintico_decubito_supino: false,
        tonico_laberintico_decubito_prono: false,
        reaccion_apoyo_positivo: false,
        reaccion_apoyo_negativo: false
    });
    return(
        <>  
            <div>
                <SelectPeriodoComponent opcion={periodo} setOpcion={setPeriodo} apartado={'segundo'}/>
                <ReflejosChecklist reflejos={reflejos} setReflejos={setReflejos} />
                <button onClick={() => saveOrUpdateReflejos(id_bebe, reflejos, setMessage)}> Guardar cambios </button>
                <p>{message}</p>
            </div>
            
        </>
    );
}

export default ReflejosSegundoForm;