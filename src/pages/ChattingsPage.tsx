import { useState, useEffect } from "react";
// components
import Splash from "../components/Splash";
import Navigation from "../components/Navigation";
import SingleCard from "../components/SingleCard";
import DropdownMenu from "../components/DropdownMenu";
import { DownwardArrow } from "../components/icons/DownwardArrow";
import { UpwardArrow } from "../components/icons/UpwardArrow";
// styles
import styled from "styled-components";
import { PageWrapStyled } from "../components/styled/PageWrapStyled";
import { PageMainStyled } from "../components/styled/PageMainStyled";
// interface
import { chattingInterface } from "../interfaces/interface";
// constants
import { PAGEKEY } from "../constants/LOCAL_KEY";
import chatsData from "../json/chatsData.json";

const ChattingsPage = () => {
  localStorage.setItem(PAGEKEY, "chattings");

  const [roomList, setRoomList] = useState<chattingInterface[]>(
    chatsData.chattings
  );
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleSortingClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSorting(!isSorting);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  const sortRooms = (sortby: string) => {
    const sortedRooms = roomList.sort(
      (a: chattingInterface, b: chattingInterface) => {
        let x: any = new Date(a.chatList[a.chatList.length - 1].date);
        let y: any = new Date(b.chatList[b.chatList.length - 1].date);
        return sortby === "최신 메시지 순" ? y - x : x - y;
      }
    );

    setRoomList(sortedRooms);
    setIsSorting(false);
  };

  return (
    <PageWrapStyled>
      <Splash />

      <Navigation menu="chattings" />

      <Main>
        <Header>
          <span>채팅</span>
          <div onClick={handleSortingClick}>
            {isSorting ? (
              <UpwardArrow width={10} height={10} />
            ) : (
              <DownwardArrow width={10} height={10} />
            )}
          </div>
        </Header>

        {isSorting && (
          <DropdownMenu
            coords={coords}
            menuList={["최신 메시지 순", "오래된 메시지 순"]}
            handleMenuClick={sortRooms}
          />
        )}

        <Body>
          {roomList.map((chatting) => {
            return (
              <SingleCard
                type="chatting"
                key={chatting.chattingId}
                chatInfo={chatting}
              />
            );
          })}
        </Body>
      </Main>
    </PageWrapStyled>
  );
};

const Main = styled(PageMainStyled)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Header = styled.header`
  width: calc(100% - 2rem);
  height: 2rem;
  margin: 1rem;
  display: flex;
  align-items: center;

  span {
    font-size: 1.2rem;
    font-weight: 700;
    user-select: none;
  }

  div {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

const Body = styled.main`
  width: 100%;
  overflow-y: scroll;
`;

export default ChattingsPage;
