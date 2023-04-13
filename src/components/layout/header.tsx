import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const NAV_LIST = [{ to: "/", name: "홈" }];

  return (
    <header.wrap>
      <ul.nav>
        {NAV_LIST.map((nav, i) => {
          const { to, name } = nav;

          return (
            <li key={i}>
              <Link to={to}>{name}</Link>
            </li>
          );
        })}
      </ul.nav>
    </header.wrap>
  );
}

const header = {
  wrap: styled.header`
    position: absolute;
    height: 40px;
    background-color: aliceblue;
  `,
};

const ul = {
  nav: styled.ul`
    display: flex;

    li {
      padding: 4px;
    }
  `,
};
