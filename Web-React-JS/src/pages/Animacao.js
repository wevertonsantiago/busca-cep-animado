import Lottie from "lottie-react";
import CepAnimado from "../assets/cepAnimation2.json";

const Animacao = () => {
  return <Lottie 
  animationData={CepAnimado}
  loop={true}
   />;
};

export default Animacao;