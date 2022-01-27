import { FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";

import { appName } from "@/shared/constants";

import { Title } from "@/styles/pages/Home";

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();

  const [username, setUsername] = useState("joaogabriel-sg");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push("/chat");
  }

  return (
    <>
      <Head>
        <title>{appName}</title>
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
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: theme.colors.neutrals[700],
          }}
        >
          <Box
            as="form"
            onSubmit={handleSubmit}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title>Welcome, friend!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: theme.colors.neutrals[300],
              }}
            >
              {appName}
            </Text>

            <TextField
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: theme.colors.neutrals[200],
                  mainColor: theme.colors.neutrals[900],
                  mainColorHighlight: theme.colors.primary[500],
                  backgroundColor: theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: theme.colors.neutrals[0],
                mainColor: theme.colors.primary[500],
                mainColorLight: theme.colors.primary[400],
                mainColorStrong: theme.colors.primary[600],
              }}
            />
          </Box>

          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: theme.colors.neutrals[800],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: theme.colors.neutrals[200],
                backgroundColor: theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
