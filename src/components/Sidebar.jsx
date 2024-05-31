import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="px-5 pt-10 bg-darkgray text-white col-md-3">
      <div className="col">
        <div className="col-12">
          <br />
          <div>
            <Link to={"/expense"}>Dashboard</Link>
          </div>
          <div>
            <Link to={"/category"}>Categories</Link>
          </div>
          <div>
            <Link to={"/monthly-report"}>Monthly Report</Link>
          </div>
          <div>
            <Link to={"/yearly-report"}>Yearly Report</Link>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
