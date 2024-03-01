import { useAsync } from "react-use";
import "./App.css";

function App() {
  const { value } = useAsync(async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
      (response) => response.json()
    );
  });
  return (
    <>
      <div>aaa: {value?.title}</div>
    </>
  );
}

export default App;
