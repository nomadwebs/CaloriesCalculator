import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}


export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    //Este HandleChange nos sirve tanto para el evento change del select como para el input
    //por eso le decimos que el evento puede ser de un select o de un input
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        //Para validar que los imputs category y calories son numeros
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value //Si es numérico lo convertimos a number con el simbolo +
        })
    }

    //Validamos que el nombre de la actividad no esté vacío y que las calorías sean mayores a 0
    //Si no se cumple la validación el botón de submit estará deshabilitado
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        }) //Limpiamos el formulario al estado inicial añadiendole un nuevo uuid para la siguiente activity
        //console.log("Actividad enviada:", activity); // ← Verifica esto en la consola
    }


    return (
        <div>
            <form
                className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}>

                {/* Category */}
                <div className="grid gird-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Category:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        name="category"
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >

                        {categories.map(category => (
                            <option
                                value={category.id}
                                key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Activity */}
                <div className="grid gird-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Activity:</label>
                    <input
                        id="name"
                        type="text"
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder="Ex. Food, Orange Juice, Salad, Running, Fitness, Bike"
                        value={activity.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Calories */}
                <div className="grid gird-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calories:</label>
                    <input
                        id="calories"
                        type="number"
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder="Calories: 300, 400, 500..."
                        value={activity.calories}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit */}
                <input
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                    value={activity.category === 1 ? 'Add Food' : 'Add Exercice'}
                    disabled={!isValidActivity()}
                />
            </form>
        </div>
    )
}
