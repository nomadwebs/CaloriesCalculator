import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
/* Hero Icons DOC: https://github.com/tailwindlabs/heroicons */
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    //console.log('Componente activityList: ', activities)

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
        [activities])


    const isEmpty = useMemo(() => activities.length === 0, [activities])

    return (
        <div>
            <>
                <h2 className='text-4xl font-bold text-slate-600 text-center'>
                    Food and activities
                </h2>

                {isEmpty ?
                    <p className="text-center my-5">There are not activities yet</p> :
                    activities.map(activity =>

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
                                {/* Botón para editar */}
                                <button
                                    onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                                >
                                    <PencilSquareIcon
                                        className="h-8 w-8 text-gray-800 hover:cursor-pointer"
                                    />
                                </button>

                                {/* Botón para eliminar */}
                                <button
                                    onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                                >
                                    <XCircleIcon
                                        className="h-8 w-8 text-red-500 hover:cursor-pointer"
                                    />
                                </button>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    )
}
