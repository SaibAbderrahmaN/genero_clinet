import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatHeader } from "../../components/Chat";
import useResponsive from "../../hooks/useResponsive";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../sections/Dashboard/Conversation";
import { useDispatch, useSelector } from "react-redux";

const Conversation = ({ isMobile, menu }) => {

  const {  current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );


  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {current_messages.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} key={idx} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} key={idx} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} key={idx} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu}  key={idx} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} key={idx} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} key={idx} />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();
  const messageListRef = useRef(null);
  const isDesktop = useResponsive("up", "md");
  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  return (
    <Stack
    height={ isDesktop ? "100%" :"88%"}
    maxHeight={"90vh"}
    minHeight={"85vh"}
    width={isMobile ? "100vw" : "auto"}
  >
      {/*  */}
      <ChatHeader />
      <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",

          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
          <Conversation menu={true} isMobile={isMobile} />
        </SimpleBarStyle>
      </Box>
      {/*  */}
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
