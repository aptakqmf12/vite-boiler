import { useState } from "react";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Home, Mail, Inbox, People } from "@mui/icons-material";

export interface TemplateProps {
  name: string;
  status: TabStatus;
  component: React.ReactNode;
}

export enum TabStatus {
  ONE,
  TWO,
  THREE,
  FOUR,
}

export default function Template({ data }: { data: TemplateProps[] }) {
  const [currentTab, setCurrentTab] = useState<TabStatus>(TabStatus.ONE);

  const content = data.find((tab) => tab.status === currentTab)?.component;

  return (
    <div.wrap>
      <div className="sidebar">
        <Box
          sx={{
            width: 300,
            height: "100%",
            borderRight: "1px #dddddd solid",
          }}
        >
          <List>
            {data.map((tab, index) => (
              <ListItem
                key={index}
                onClick={() => setCurrentTab(tab.status)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    {
                      [<Home />, <Mail />, <Inbox />, <People />, <Mail />][
                        index
                      ]
                    }
                  </ListItemIcon>
                  <ListItemText primary={tab.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>

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

    .content {
      width: 100%;

      padding: 10px;
      background-color: #ffffff;
      box-sizing: border-box;
    }
  `,
};
