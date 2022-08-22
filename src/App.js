import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Pagination from "./Pagination";

const Container = styled.div``;

const getData = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

function App() {
  // States
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { status, data } = useQuery("posts", getData);
  const offset = (page - 1) * limit;

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <label>
        페이지 당 표시할 게시물 수:{" "}
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      <main>
        {data.data
          .slice(offset, offset + limit)
          .map(({ title, id, userId, body }) => (
            <article key={id}>
              <h3>
                {id}. {title}
              </h3>
              <p>{body}</p>
            </article>
          ))}
      </main>

      <footer>
        <Pagination
          total={data.data.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Container>
  );
}

export default App;
