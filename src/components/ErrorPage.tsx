import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>Oops</h1>
      <p>You arrived at a wrong url</p>
      <Link to="/" style={{ color: "darkkhaki" }}>
        {" "}
        Return to homepage
      </Link>
    </div>
  );
}
