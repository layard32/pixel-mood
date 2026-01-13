import "@mantine/core/styles.css";
import {
  MantineProvider,
  AppShell,
  Burger,
  Group,
  ActionIcon,
  Text,
  NavLink,
  Stack,
} from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconHome,
  IconChartBar,
  IconSettings,
} from "@tabler/icons-react";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { Calendar } from "./components/calendar";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

const queryClient = new QueryClient();

function AppContent() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // per il toggle del tema scuro / chiaro
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

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
        <Group h="100%" px="md" justify="center">
          <Group
            h="100%"
            justify="space-between"
            style={{ width: "100%", maxWidth: 500 }}
          >
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="md"
                size="sm"
              />
              <Text size="lg">Pixel-Mood</Text>
            </Group>
            <ActionIcon
              onClick={toggleColorScheme}
              variant="default"
              size="lg"
              aria-label="Toggle color scheme"
            >
              {colorScheme === "dark" ? (
                <IconSun size={20} />
              ) : (
                <IconMoon size={20} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            label={<Text size="lg">Home</Text>}
            leftSection={<IconHome size={16} />}
          />
          <NavLink
            label={<Text size="lg">Stats</Text>}
            leftSection={<IconChartBar size={16} />}
          />
          <NavLink
            label={<Text size="lg">Settings</Text>}
            leftSection={<IconSettings size={16} />}
          />
        </Stack>
      </AppShell.Navbar>

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
        <Notifications />
        <AppContent />
      </MantineProvider>
    </QueryClientProvider>
  );
}
