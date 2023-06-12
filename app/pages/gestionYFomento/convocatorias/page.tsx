"use client"
import React from 'react'

import {Button, Grid, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import LayoutFomento from '@/app/layouts/LayoutFomento';
import { convocatoriaEmprendimiento } from './interface/emprendimiento.interface';
import { BaseForm } from '@/app/components/General/BaseForm';
import { convocatoriaAlimento } from './interface/aliementaria.interface';
import { convocatoriaAlojamiento } from './interface/alojamiento.interface';
import { convocatoriaEconomica } from './interface/economica.interface';
import { convocatoriaTransporte } from './interface/transporte.interface';
import {
    convFomentoEmprendimiento,
    convAlimentaria,
    convAlojamiento,
    convEconomica,
    convTransporte,
    est_toma_conv
} from '@/app/types/gestionYFomento/convocatorias/convocatorias';
import { apiCgfEmprendimiento } from '@/app/api/GestionFomento/convocatorias/conv_fomento_emprendimiento';
import { apiCgfAlimentaria } from '@/app/api/GestionFomento/convocatorias/conv_gestion_alimentaria';
import { apiCgfAlojamiento } from '@/app/api/GestionFomento/convocatorias/conv_gestion_alojamiento';
import { apiCgfEconomica } from '@/app/api/GestionFomento/convocatorias/conv_gestion_economica';
import { apiCgfTransporte } from '@/app/api/GestionFomento/convocatorias/conv_gestion_transporte';
import { apiEstudianteTomaConv } from '@/app/api/GestionFomento/convocatorias/estudiante_toma_conv';
import { apiEst_toma_conv } from '@/app/api/General/est_toma_conv';

export default function Convocatorias() {

    // Form data collectors 'state holders'
    const [forEmprendimiento, setForEmprendimiento] = React.useState<convFomentoEmprendimiento>(
        {
            nombre: '',
            tema: ''
        }
    )

    const [forAlimentaria, setForAlimentaria] = React.useState<convAlimentaria>(
        {
            cedula: 0,
            comida: '',
            lugar: ''
        }
    )

    const [forAlojamiento, setForAlojamiento] = React.useState<convAlojamiento>(
        {
            cedula: 0,
            localidad: '',
            tipo: ''
        }
    )

    const [forEconomica, setForEconomica] = React.useState<convEconomica>(
        {
            cedula: 0,
            filter_min: 0,
            filter_max: 0
        }
    )

    const [forTransporte, setForTransporte] = React.useState<convTransporte>(
        {
            cedula: 0,
            tipo: ''
        }
    )

    const [params_est_toma_conv, set_params_est_toma_conv] = React.useState<est_toma_conv>(
        {
            cedula: 0,
            conv_id: 1,
            fecha: '2023-01-01'
        }
    )


    // API data holders 'state holders'
    const [cgfEmprendimiento, setcgfEmprendimiento] = React.useState<convocatoriaEmprendimiento[] | null>(null)

    const [cgfAlimentaria, setcgfAlimentaria] = React.useState<convocatoriaAlimento[] | null>(null)

    const [cgfAlojamiento, setcgfAlojamiento] = React.useState<convocatoriaAlojamiento[] | null>(null)

    const [cgfEconomica, setcgfEconomica] = React.useState<convocatoriaEconomica[] | null>(null)

    const [cgfTransporte, setcgfTransporte] = React.useState<convocatoriaTransporte[] | null>(null)


    // Data setters 'on change handlers'
    const setEmprendimientoData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForEmprendimiento(
            {
                ...forEmprendimiento, [e.target.name]: e.target.value
            }
        )
    }

    const setAlimentariaData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForAlimentaria(
            {
                ...forAlimentaria, [e.target.name]: e.target.value
            }
        )
    }

    const setAlojamientoData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setForAlojamiento(
            {
                ...forAlojamiento, [e.target.name]: e.target.value
            }
        )
    }

    const setEconomicaData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setForEconomica(
            {
                ...forEconomica, [e.target.name]: e.target.value
            }
        )
    }

    const setTransporteData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForTransporte(
            {
                ...forTransporte, [e.target.name]: e.target.value
            }
        )
    }


    const value_est_toma_conv = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        set_params_est_toma_conv(
            {
                ...params_est_toma_conv, [e.target.name]: e.target.value
            }
        )
    }


    // API request performers:
    const handleEmprendimiento = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //call endpoint function
        apiCgfEmprendimiento.getCgfEmprendimiento(forEmprendimiento.nombre, forEmprendimiento.tema).then((response) => {
            setcgfEmprendimiento(response.data)
            console.log(cgfEmprendimiento)
        }).catch((Error) => {
            console.log(Error)
        })
    }

    const handleAlimentaria = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //call endpoint function
        apiCgfAlimentaria.getCgfAlimentaria(
            forAlimentaria.cedula, forAlimentaria.comida, forAlimentaria.lugar).then((response) => {
                setcgfAlimentaria(response.data);
                console.log(cgfAlimentaria)
            }).catch((Error) => {
                console.log(Error)
            })

    }

    const handleAlojamiento = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //call endpoint function
        apiCgfAlojamiento.getByUserId(
            forAlojamiento.cedula, forAlojamiento.localidad, forAlojamiento.tipo).then((response) => {
                setcgfAlojamiento(response.data);
            }).catch((Error) => {
                console.log(Error)
            })
        console.log(cgfAlojamiento)
    }

    const handleEconomica = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //call endpoint function
        apiCgfEconomica.getByUserId(
            forEconomica.cedula, forEconomica.filter_min, forEconomica.filter_max
        ).then((response) => {
            setcgfEconomica(response.data)
        }).catch(
            (Error) => {
                console.log(Error)
            })
        console.log(cgfEconomica)
    }

    const handleTransporte = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //call endpoint function
        apiCgfTransporte.getcgfTransporte(
            forTransporte.cedula, forTransporte.tipo
        ).then((response) => {
            setcgfTransporte(response.data)
        }).catch((error) => {
            console.log(`${error}`)
        })
        console.log(cgfTransporte)
    }

    const handle_est_toma_conv = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiEst_toma_conv.post_est_toma_conv(
            params_est_toma_conv.cedula, params_est_toma_conv.conv_id, params_est_toma_conv.fecha
        ).then((response)=> {
            console.log("El estudiante se registró a la convocatoria exitosamente. Espere la respuesta de la dirección.")
        }).catch((error) => {
            console.log(`${error}: El estudiante no pudo registrarse a la convocatoria.`)
        })
    }

    return (
        <LayoutFomento>
            <br />

            <Grid container
                component='main'
                alignItems='center'
                justifyContent='center'
                direction='column'
                spacing={5}
                sx={{ width: '100%' }}>

                {/*Convocatorias de:  fomento emprendimiento*/}
                {/*Parámetros : cédula de estudiante, y tema de emprendimiento */}

                <Grid item
                    sx={{ width: '75%' }}
                >


                    <BaseForm title='Convocatoria Fomento emprendimiento'
                        children={
                            <>
                                <TextField name='nombre' onChange={setEmprendimientoData} placeholder='Nombre' />
                                <TextField name='tema' onChange={setEmprendimientoData} placeholder='Tema emprendimiento' />
                            </>

                        }

                        children2={
                            <Button type='submit' variant="contained"
                                sx={{ color: "black", bgcolor: "#E74C3C" }} endIcon={<SearchIcon />}>Consultar</Button>
                        }

                        children3={
                            <>

                                {
                                    cgfEmprendimiento !== null ? ( //if we got elements then we render them. if not then we don't render nothing.

                                        <Grid container
                                            component="div"
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="row"
                                            spacing={1}
                                            sx={{ height: "100%" }}>

                                            {
                                                cgfEmprendimiento!.map((convocatoria) => (
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                ))

                                            }
                                        </Grid>

                                    ) : null}
                            </>
                        }
                        submit={handleEmprendimiento}
                    ></BaseForm>




                </Grid>

                <Grid item
                    sx={{ width: '75%' }}
                >
                    {/*Convocatorias de:  gestión alimentaria*/}
                    {/*Parámetros : cédula de estudiante, comida (lista desplegable), lugar (lista desplegable) */}


                    <BaseForm title='Convocatoria Gestión Alimentaria'
                        children={
                            <>
                                <TextField name='cedula' onChange={setAlimentariaData} placeholder='Cédula' />
                                <TextField name='comida' onChange={setAlimentariaData} placeholder='Comida' />
                                <TextField name='lugar' onChange={setAlimentariaData} placeholder='Lugar' />
                            </>

                        }

                        children2={
                            <Button type='submit' variant="contained" sx={{ color: "black", bgcolor: "#E74C3C" }} endIcon={<SearchIcon />}>Consultar</Button>
                        }

                        children3={
                            <>

                                {
                                    cgfAlimentaria !== null ? ( //if we got elements then we render them. if not then we don't render nothing.

                                        <Grid container
                                            component="div"
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="row"
                                            spacing={1}
                                            sx={{ height: "100%" }}>

                                            {
                                                cgfAlimentaria!.map((convocatoria) => (
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                ))

                                            }
                                        </Grid>

                                    ) : null}
                            </>
                        }
                        submit={handleAlimentaria}
                    ></BaseForm>


                </Grid>

                <Grid item
                    sx={{ width: '75%' }}
                >
                    {/*Convocatorias de:  gestión alojamiento*/}
                    {/*Parámetros : cédula de estudiante, localidad, tipo (lista desplegable), */}

                    <BaseForm title='Convocatoria Gestión Alojamiento'
                        children={
                            <>
                                <TextField onChange={setAlojamientoData} name='cedula' placeholder='Cédula' />
                                <TextField onChange={setAlojamientoData} name='localidad' placeholder='Localidad' />
                                <TextField onChange={setAlojamientoData} name='tipo' placeholder='Tipo' />

                            </>

                        }

                        children2={
                            <Button type='submit' variant="contained" sx={{ color: "black", bgcolor: "#E74C3C" }} endIcon={<SearchIcon />}>Consultar</Button>
                        }

                        children3={
                            <>

                                {
                                    cgfAlojamiento !== null ? ( //if we got elements then we render them. if not then we don't render nothing.

                                        <Grid container
                                            component="div"
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="row"
                                            spacing={1}
                                            sx={{ height: "100%" }}>

                                            {
                                                cgfAlojamiento!.map((convocatoria) => (
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                ))

                                            }
                                        </Grid>

                                    ) : null}
                            </>
                        }
                        submit={handleAlojamiento}
                    ></BaseForm>

                </Grid>

                <Grid item
                    sx={{ width: '75%' }}
                >

                    {/*Convocatorias de:  gestión económica*/}
                    {/*Parámetros : cédula de estudiante*/}

                    <BaseForm title='Convocatoria Gestión Económica'
                        children={
                            <>
                                <TextField name='cedula' onChange={setEconomicaData} placeholder='Cédula' />

                                <TextField name='filter_min' onChange={setEconomicaData} placeholder='Min' />

                                <TextField name='filter_max' onChange={setEconomicaData} placeholder='Max' />
                            </>

                        }

                        children2={
                            <Button type='submit' variant="contained" sx={{ color: "black", bgcolor: "#E74C3C" }} endIcon={<SearchIcon />}>Consultar</Button>
                        }

                        children3={
                            <>

                                {
                                    cgfEconomica !== null ? ( //if we got elements then we render them. if not then we don't render nothing.

                                        <Grid container
                                            component="div"
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="row"
                                            spacing={1}
                                            sx={{ height: "100%" }}>

                                            {
                                                cgfEconomica!.map((convocatoria) => (
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                ))

                                            }
                                        </Grid>

                                    ) : null}
                            </>
                        }
                        submit={handleEconomica}
                    ></BaseForm>


                </Grid>

                <Grid item
                    sx={{ width: '75%' }}
                >

                    {/*Convocatorias de:  gestión de transporte*/}
                    {/*Parámetros : cédula estudiante, tipo transporte (lista desplegable)*/}

                    <BaseForm title='Convocatoria Gestión Transporte'
                        children={
                            <>
                                <TextField
                                    onChange={setTransporteData}
                                    name='cedula'
                                    placeholder='Cédula' />

                                <TextField
                                    onChange={setTransporteData}
                                    name='tipo'
                                    placeholder='Tipo'
                                />

                            </>
                        }

                        children2={
                            <Button type='submit' variant="contained" sx={{ color: "black", bgcolor: "#E74C3C" }} endIcon={<SearchIcon />}>Consultar</Button>
                        }

                        children3={
                            <>

                                {
                                    cgfTransporte !== null ? ( //if we got elements then we render them. if not then we don't render nothing.

                                        <Grid container
                                            component="div"
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="row"
                                            spacing={1}
                                            sx={{ height: "100%" }}>

                                            {
                                                cgfTransporte!.map((convocatoria) => (
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                ))

                                            }
                                        </Grid>

                                    ) : null}
                            </>
                        }
                        submit={handleTransporte}
                    ></BaseForm>

                </Grid>

                <Grid item sx={{ width: '75%' }} >
                        <BaseForm title='Inscribíase a una convocatoria' children={
                            <>
                                <TextField name='usuario_id' onChange={value_est_toma_conv} placeholder='Cédula' />
                                <TextField name='conv_id' onChange={value_est_toma_conv} placeholder='ID Convocatoria' />
                                <TextField name='fecha' onChange={value_est_toma_conv} placeholder='Fecha' />
                            </>
                        }

                            children2={<Button type='submit' variant="contained"
                                sx={{ color: "black", bgcolor: "#E74C3C" }}>Inscribirme</Button>}

                            children3={<>
                                {/*est_toma_conv !== null ? ( //if we got elements then we render them. if not then we don't render nothing.

                                    <Grid container
                                        component="div"
                                        justifyContent="center"
                                        alignItems="center"
                                        direction="row"
                                        spacing={1}
                                        sx={{ height: "100%" }}>

                                        {
                                            // corActividades!.map(() => (
                                            //     <Grid item xs={3}>
                                            //     </Grid>
                                            // ))
                                        }
                                    </Grid>

                                ) : null*/}
                            </>} submit={handle_est_toma_conv}
                        ></BaseForm>
                </Grid>
            </Grid>
        </LayoutFomento>
    )
}

