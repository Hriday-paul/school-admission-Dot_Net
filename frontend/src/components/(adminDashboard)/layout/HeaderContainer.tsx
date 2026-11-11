import Navbar from "@/components/shared/Navbar";
import { Header } from "antd/es/layout/layout";

type TheaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const HeaderContainer = ({ collapsed, setCollapsed }: TheaderProps) => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: "var(--color-secondary)",
        height: "80px",
        display: "flex",
        alignItems: "center",
        color: "#3A3C3B",
        paddingInline: "0",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed}></Navbar>
    </Header>
  );
};

export default HeaderContainer;
