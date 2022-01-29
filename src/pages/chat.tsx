import { KeyboardEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, TextField } from "@skynexui/components";
import { useTheme } from "styled-components";

import { ButtonSendSticker, ChatHeader, ChatMessageList } from "@/components";

import { supabase } from "@/shared/services";
import { appName } from "@/shared/constants";

type Message = {
  id: number;
  from: string;
  text: string;
};

type AddMessageProps = (message: Message) => void;

function getMessagesInRealTime(addMessage: AddMessageProps) {
  return supabase
    .from("messages")
    .on("INSERT", (message) => {
      addMessage(message.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const theme = useTheme();

  const router = useRouter();
  const loggedUser = router.query.username;

  function createNewMessage(newMessage: string) {
    const newMessageData = { from: loggedUser, text: newMessage };

    supabase
      .from("messages")
      .insert([newMessageData])
      .then(() => {
        setMessage("");
      });
  }

  function handleMessageKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      createNewMessage(message);
    }
  }

  useEffect(() => {
    supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setMessageList(data);
      });

    const subscribe = getMessagesInRealTime((message) => {
      setMessageList((prevMessageList) => [message, ...prevMessageList]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Chat | {appName}</title>
      </Head>

      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primary[500],
          backgroundImage: `linear-gradient(-155deg, ${theme.colors.primary[500]}, ${theme.colors.primary[900]})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          color: theme.colors.neutrals[0],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: theme.colors.neutrals[700],
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <ChatHeader />

          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            <ChatMessageList messages={messageList} />

            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value={message}
                onChange={({ target }) => setMessage(target.value)}
                onKeyPress={handleMessageKeyPress}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  backgroundColor: theme.colors.neutrals[800],
                  marginRight: "12px",
                  color: theme.colors.neutrals[200],
                }}
              />

              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  createNewMessage(`:sticker:${sticker}`);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
