import { useEffect, useState } from "react";
import ReflejosChecklist from "../ChecklistComponent/ChecklistComponent";
import SelectPeriodoComponent from "../SelectPeriodoComponent/SelectPeriodoComponent";

import { supabase } from '../../supabaseClient';


function ReflejosArcaicosForm({id_bebe}){
    const [message, setMessage] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [periodoGuardado, setPeriodoGuardado] = useState('');

    useEffect(() => {
        if (!id_bebe) return;

        async function fetchReflejos() {
            let query = supabase.from('reflejos_arcaicos').select('*').eq('id_bebe', id_bebe);

            if (periodo) {
            query = query.eq('periodo', periodo);
            }

            const { data, error } = await query.single();

            if (error) {
                if (error.code === 'PGRST116' || error.details?.includes('No rows found')) {
                    setPeriodoGuardado('');
                    setReflejos({
                        busqueda: false,
                        succion: false,
                        moro: false,
                        liberacion: false,
                        presion_palmar: false,
                        landau: false,
                        babinski: false
                    });
                    console.log("No hay datos previos");
                } else {
                    console.log('Error al cargar datos:', error.message);
                }
            }
            if (data) {
                console.log('Datos encontrados')
                setReflejos({
                    busqueda: data.busqueda ?? false,
                    succion: data.succion ?? false,
                    moro: data.moro ?? false,
                    liberacion: data.liberacion ?? false,
                    presion_palmar: data.presion_palmar ?? false,
                    landau: data.landau ?? false,
                    babinski: data.babinski ?? false
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
        .from('reflejos_arcaicos')
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
            .from('reflejos_arcaicos')
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
            .from('reflejos_arcaicos')
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
        busqueda: false,
        succion: false,
        moro: false,
        liberacion: false,
        presion_palmar: false,
        landau: false,
        babinski: false
    });
    return(
        <>  
            <div>
                <SelectPeriodoComponent opcion={periodo} setOpcion={setPeriodo} apartado={'arcaicos'}/>
                <ReflejosChecklist reflejos={reflejos} setReflejos={setReflejos} />
                <button onClick={() => saveOrUpdateReflejos(id_bebe, reflejos)}> Guardar cambios </button>
                <p>{message}</p>
            </div>
            
        </>
    );
}

export default ReflejosArcaicosForm;