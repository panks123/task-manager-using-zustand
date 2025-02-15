import Column from './components/Column'
import './App.css'
const SUPPORTED_STATES = ['PLANNED', 'ONGOING', 'DONE'];
function App() {

  return (
    <div className='App'>
      <h1 className='headerTitle'>Task Manager</h1>
      <div className="TaskManager">
        {
          SUPPORTED_STATES.map((state) => (
            <Column key={state} state={state} />
          ))
        }
      </div>
    </div>
  )
}

export default App
