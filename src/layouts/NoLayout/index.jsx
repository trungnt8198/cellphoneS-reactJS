import { Outlet } from "react-router-dom";

function NoLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default NoLayout;
