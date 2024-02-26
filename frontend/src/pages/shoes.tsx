"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

type Tshoe = {
    id?:number;
    model:string;
    size:string;
    price:string;
}
type TRes = {
    msg: string;
    data?: any
}


const headers = {
    headers: {
        "Content-Type": "application/json",
    }
}

export default function shoesPage() {
    useEffect(() => {
        getshoe();
    }, []);

    const [shoe, setshoe] = useState<Tshoe[]>([]);
    const [shoes, setshoes] = useState<Tshoe>({
        model: "",
        size: "",
        price: ""
    });

    const [isEditable, setIsEditable] = useState(false);

    const onChange = (e: any) => {
        const data: any = shoes;
        data[e.target.name] = e.target.value;
        setshoes(data);
    }



    const getshoe = async () => {
        try {
            const response = await axios.get<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/get`);

            if (response.data.data) {
                setshoe(response.data.data);
            }
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const createshoe = async () => {
        try {
            await axios.post<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/create`, shoes, headers);
            getshoe();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const updateshoes = async (id:number) => {
        try {
            await axios.put<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/update/${id}`,
                shoes,
                headers
            );
            getshoe();
            setIsEditable(false);
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const deleteshoes = async (id: number) => {
        try {
            await axios.delete<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/delete/${id}`,
            );
            getshoe();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const preUpdate = (e:Tshoe) => {
        setshoes(e);
        setIsEditable(true);
    }

    return (
        <div>
            <h1>CRUD De Eventos</h1>
            <div>
                <label htmlFor="model">Ingresa el nombre del modelo:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='model'
                    placeholder='Nombre'
                /><br/>
                <label htmlFor="size">Ingresa la talla del modelo:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='size'
                    placeholder='Talla'
                /><br/>
                <label htmlFor="price
    ">Ingresa el price
     del modelo:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='price
        '
                    placeholder='Color'
                /><br/>
            </div>
            <button onClick={createshoe}>Agregar modelo</button>
            <table>
                <tr>
                    <th>Modelo</th>
                    <th>Talla</th>
                    <th>Color</th>
                    <th>Opciones</th>
                </tr>
                {shoe.map((shoes, index) => (
                    <tr key={index}>
                        <td>{shoes.model}</td>
                        <td>{shoes.size}</td>
                        <td>{shoes.price}</td>
                        <td>
                            <button onClick={() => deleteshoes(shoes.id ?? 0)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={() => preUpdate(shoes)}>Update</button>
                        </td>
                    </tr>
                ))}
            </table>

            {
                isEditable && (
                    <div>
                        <h2>Actualizar</h2>
                        <label htmlFor="model">Ingresa el nombre del modelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={shoes.model}
                            name='model'
                        /><br/>
                        <label htmlFor="size">Ingresa la talla del modelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={shoes.size}
                            name='size'
                        /><br/>
                        <label htmlFor="price">Ingresa el precio del modelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={shoes.price}
                            name='price'
                        /><br/>
                        <button onClick={() => updateshoes(shoes.id ?? 0)}>Guardar</button>
                    </div>
                )
            }
        </div>
    );
}
