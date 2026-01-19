// App.tsx
import PythonRunner from './components/PythonRunner';

function App() {
  return (
    <PythonRunner
      initialCode={`# use  paint(x, y)`}
    />
  );
}

export default App;