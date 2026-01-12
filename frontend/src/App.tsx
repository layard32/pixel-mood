import "@mantine/core/styles.css";
import { MantineProvider, AppShell, Burger, Group } from "@mantine/core";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { Calendar } from "./components/calendar";

const queryClient = new QueryClient();

function AppContent() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <div>Logo</div>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Calendar />
      </AppShell.Main>
    </AppShell>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AppContent />
      </MantineProvider>
    </QueryClientProvider>
  );
}
