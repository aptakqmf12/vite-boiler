import { useState } from "react";
import styled from "styled-components";

export interface TemplateProps {
  name: string;
  status: TabStatus;
  component: React.ReactNode;
}

export enum TabStatus {
  ONE,
  TWO,
  THREE,
}

export default function Template({ data }: { data: TemplateProps[] }) {
  const [currentTab, setCurrentTab] = useState<TabStatus>(TabStatus.ONE);

  const content = data.find((tab) => tab.status === currentTab)?.component;

  return (
    <div.wrap>
      <nav>
        <ul>
          {data.map((tab, i) => (
            <li onClick={() => setCurrentTab(tab.status)} key={i}>
              {tab.name}
            </li>
          ))}
        </ul>
      </nav>

      <div className="content">{content}</div>
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    nav {
      width: 150px;
      padding: 4px;
      ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px gray solid;
        }
      }
    }

    .content {
      width: 100%;
      height: 100%;
      padding: 4px;
      background-color: #a7a4a4;
      box-sizing: border-box;
    }
  `,
};
