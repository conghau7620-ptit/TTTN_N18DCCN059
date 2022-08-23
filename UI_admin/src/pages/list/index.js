import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Datatable from "../../components/datatable";

import "./style.scss";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
