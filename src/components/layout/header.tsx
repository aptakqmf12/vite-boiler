import { Link } from "react-router-dom";
import styled from "styled-components";
import { useWindowStore } from "../../store";

export default function Header() {
  const { currentWindows, toggleShowWindow } = useWindowStore();
  const NAV_LIST = [{ to: "/", name: "홈" }];

  return (
    <header.wrap>
      <ul.nav>
        {currentWindows.map((window, i) => (
          <li
            onClick={() => toggleShowWindow(window.uuid)}
            style={{
              backgroundColor: window.isShow
                ? "rgb(53, 153, 199)"
                : "rgb(177, 177, 177)",
            }}
            key={i}
          >
            {window.name}
          </li>
        ))}
      </ul.nav>
      {/* <ul.nav>
        {NAV_LIST.map((nav, i) => {
          const { to, name } = nav;

          return (
            <li key={i}>
              <Link to={to}>{name}</Link>
            </li>
          );
        })}
      </ul.nav> */}
    </header.wrap>
  );
}

const header = {
  wrap: styled.header`
    position: absolute;
    left: 10px;
    top: 10px;
  `,
};

const ul = {
  nav: styled.ul`
    display: flex;
    gap: 10px;

    li {
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      border: 1px black solid;
      color: white;
    }
  `,
};
