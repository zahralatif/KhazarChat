import "./dashboardPage.css";

const DashboardPage = ({ isSidebarOpen }) => {
  return (
    <div className={`dashboardPage ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="mainContent">
        <div className="logo">
          <img src="/khu_logo.png" alt="logo" />
        </div>
        <div className="warning_message">
          <h2>
            Diqqət: Bu söhbət botu Xəzər Universiteti tələbələri tərəfindən
            hazırlanan tədqiqat məhsuludur və hazırda inkişaf etdirilir. Zəhmət
            olmasa, aldığınız vacib məlumatların doğruluğunu yoxlayın.
          </h2>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" placeholder="Buyurun, sualınızı verin!" />
          <button>
            <img src="/send.png" alt="send-button" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
