import { useState } from "react"
import { categories } from "../data/categories"

export default function Form() {

    const [activity, setActivity] = useState({
        category: '1',
        name: '',
        calories: 0
    })

    const handleChange = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)

        setActivity({
            ...activity,
            [e.target.id]: e.target.value,
        })
    }


    return (
        <div>
            <form className="space-y-5 bg-white shadow p-10 rounded-lg">

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
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                    value='Save food or exercice'
                />
            </form>
        </div>
    )
}
