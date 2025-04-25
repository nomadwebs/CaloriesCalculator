import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
/* Hero Icons DOC: https://github.com/tailwindlabs/heroicons */
import { PencilSquareIcon } from '@heroicons/react/24/outline'

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({ activities }: ActivityListProps) {

    //console.log('Componente activityList: ', activities)

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
        [activities])

    return (
        <div>
            <>
                <h2 className='text-4xl font-bold text-slate-600 text-center'>Food and activities</h2>

                {activities.map(activity =>
                    //Visualización principal de actividad
                    <div key={activity.id} className="px-5 py-10 mb-10 shadow rounded-b-md bg-white mt-5 flex justify-between">
                        {/* Columna izquierda */}
                        <div className="space-y-3 relative">
                            <p className={`absolute -top-12 -left-8 px-10 py-2 text-white uppercase font-bold 
                                ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(+activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500" >{activity.calories} {''} <span>Calories</span></p>
                        </div>

                        {/* Columna derecha con acciones */}
                        <div className="flex gap-5 items-center">
                            <button>
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>
                        </div>

                    </div>
                )
                }
            </>
        </div >
    )
}
