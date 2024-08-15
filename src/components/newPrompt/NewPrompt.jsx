import { Link } from "react-router-dom";
import "./newPrompt.css";

const NewPrompt = () => {
  return (
    <div className="newPrompt">
      <form className="newForm">
        <input type="text" placeholder="Buyurun, sualınızı verin!" />
        <button>
          <img src="/send.png" alt="send-button" />
        </button>
      </form>
      <span>
        <Link to="/">KhazarBot</Link> səhv edə bilər. Vacib məlumatların
        doğruluğunu yoxlayın.
      </span>
    </div>
  );
};

export default NewPrompt;
