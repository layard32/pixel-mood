import { notifications } from '@mantine/notifications';

export const showSuccessNotification = (message: string) => {
    notifications.show({
        title: 'Success',
        message,
        color: 'green',
        autoClose: 3000,
        position: 'top-right'
    });
}

export const showErrorNotification = (message: string) => {
    notifications.show({
        title: 'Error',
        message,
        color: 'red',
        autoClose: 3000,
        position: 'top-right'
    });
}