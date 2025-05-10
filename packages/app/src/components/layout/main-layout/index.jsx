import Navbar from "../../widgets/navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen bg-custom-gradient-2">
      <Navbar />
      <>{children}</>
    </div>
  );
};

export default MainLayout;
