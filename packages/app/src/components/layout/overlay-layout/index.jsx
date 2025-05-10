import Navbar from "../../widgets/navbar";

const OverlayLayout = ({ children }) => {
  return (
    <div className="bg-custom-gradient-3 bg-opacity-15 h-screen">
      <Navbar small />
      <>{children}</>
    </div>
  );
};

export default OverlayLayout;
