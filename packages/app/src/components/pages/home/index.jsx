import MainLayout from "../../layout/main-layout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center py-20">
        <div className="flex flex-row items-center gap-40">
          <div className="flex flex-col items-center">
            <p className="font-extrabold text-[50px] text-white">Book here</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
