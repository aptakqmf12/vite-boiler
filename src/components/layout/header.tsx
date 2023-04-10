import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const NAV_LIST = [{ to: "/", name: "홈" }];

  return (
    <header>
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
    </header>
  );
}
const ul = {
  nav: styled.ul`
    display: flex;

    li {
      padding: 4px;
    }
  `,
};
