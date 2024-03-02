import { useAsync } from "react-use";
import "./App.css";

function App() {
  const demo1 = useAsync(async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
      (response) => response.json()
    );
  });
  const demo2 = useAsync(async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/2?foo=bar").then(
      (response) => response.json()
    );
  });
  return (
    <div>
      <div>loading: {String(demo1.loading)}</div>
      <div>error: {String(demo1.error?.message)}</div>
      <pre style={{ textAlign: "left", height: 200 }}>
        {JSON.stringify(demo1.value, null, 2)}
      </pre>
      <div>loading: {String(demo2.loading)}</div>
      <div>error: {String(demo2.error?.message)}</div>
      <pre style={{ textAlign: "left", height: 200 }}>
        {JSON.stringify(demo2.value, null, 2)}
      </pre>
    </div>
  );
}

export default App;
