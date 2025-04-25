import { useReducer } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { activityReducer, initialState } from "./reducers/activity-reducer"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  //console.log(state)

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calories Counter
          </h1>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
          />
        </div>
      </section>

      {/* Tendrá un relleno de 40px en sus cuatro lados (p-10).
      Estará centrado horizontalmente dentro de su contenedor padre (mx-auto).
      Su anchura máxima será de 896px (max-w-4xl). */}
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
        />
      </section>
    </>
  )
}

export default App
