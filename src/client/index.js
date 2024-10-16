import "./styles/style.scss";
import "./styles/card.scss";
import "./styles/responsive.scss";
import { handleForm } from "./js/handleForm";

document.getElementById('travel-form').addEventListener('submit', handleForm);