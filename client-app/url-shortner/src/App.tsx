import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Container from "./components/Container/container";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
    < Header />
    <Container />
    < Footer />
    </>
  );
};

export default App;

