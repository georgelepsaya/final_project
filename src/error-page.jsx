import { useRouteError } from "react-router-dom";
import styles from "./error-page.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.error_container}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}