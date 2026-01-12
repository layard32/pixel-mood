import "@mantine/core/styles.css";
import { MantineProvider, AppShell, Burger } from "@mantine/core";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

const queryClient = new QueryClient();

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppShell
          padding="md"
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
        >
          <AppShell.Header>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <div>Logo</div>
          </AppShell.Header>

          <AppShell.Navbar>Navbar</AppShell.Navbar>

          <AppShell.Main>Main</AppShell.Main>
        </AppShell>
      </QueryClientProvider>
    </MantineProvider>
  );
}
