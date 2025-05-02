import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  //console.log(state)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calories Counter
          </h1>
          <button
            className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Restart data
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      {/* Tendrá un relleno de 40px en sus cuatro lados (p-10).
      Estará centrado horizontalmente dentro de su contenedor padre (mx-auto).
      Su anchura máxima será de 896px (max-w-4xl). */}
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
