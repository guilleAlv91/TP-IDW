import "@fortawesome/fontawesome-free/css/all.min.css";
import '../Footer.css';

function Footer() {
  return (
    <footer>
      <div className="redes-sociales">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
      &copy; Derechos Reservados - 2024
    </footer>
  );
}

export default Footer;