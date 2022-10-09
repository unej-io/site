import { Button, Group, Stack, Text } from "@mantine/core";
import { useDidUpdate, useLocalStorage } from "@mantine/hooks";
import { showNotification, hideNotification } from "@mantine/notifications";

function useCookie() {
  const [visible, setVisible] = useLocalStorage<boolean | undefined>({ key: "use-cookie" });

  console.log({ visible });

  useDidUpdate(() => {
    if (typeof visible !== "boolean") {
      setVisible(true);
      return;
    }

    if (visible) {
      showNotification({
        id: "use-cookie",
        title: "Cookie",
        message: (
          <Stack>
            <Text>We use cookies to improve your experience on our website</Text>

            <Group position="right">
              <Button
                onClick={() => {
                  setVisible(false);
                  hideNotification("use-cookie");
                }}
              >
                Understand
              </Button>
            </Group>
          </Stack>
        ),
        autoClose: false,
        disallowClose: true,
      });
    }
  }, [visible]);
}

export default useCookie;
