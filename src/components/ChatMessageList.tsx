import { Box, Image, Text } from "@skynexui/components";
import { useTheme } from "styled-components";

type Message = {
  id: number;
  from: string;
  text: string;
};

type ChatMessageList = {
  messages: Message[];
};

export function ChatMessageList({ messages }: ChatMessageList) {
  const theme = useTheme();

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {messages.map((message) => (
        <Text
          key={message.id}
          tag="li"
          styleSheet={{
            borderRadius: "5px",
            padding: "6px",
            marginBottom: "12px",
            hover: {
              backgroundColor: theme.colors.neutrals[700],
            },
          }}
        >
          <Box styleSheet={{ marginBottom: "8px" }}>
            <Image
              styleSheet={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
              src={`https://github.com/${message.from}.png`}
            />
            <Text tag="strong">{message.from}</Text>
            <Text
              styleSheet={{
                fontSize: "10px",
                marginLeft: "8px",
                color: theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {new Date().toLocaleDateString()}
            </Text>
          </Box>

          {message.text}
        </Text>
      ))}
    </Box>
  );
}
