import {notification} from 'antd';

type NotificationType = 'success' | 'warning' | 'error' | 'info';

class NotificationService {

    static openNotificationWithIcon(type: NotificationType, title: string, content: string) {
        switch (type) {
            case 'success':
                return notification.success({message: title, description: content});
            case 'error':
                return notification.error({message: title, description: content});
            case 'warning':
                return notification.warning({message: title, description: content});
            default:
                return notification.info({message: title, description: content});
        }
    }

    static success(title: string, content: string) {
        return this.openNotificationWithIcon('success', title,  content);
    }

    static error(title: string, content: string) {
        return this.openNotificationWithIcon('error', title, content);
    }

    static warning(title: string, content: string) {
        return this.openNotificationWithIcon('warning', title, content);
    }

    static info(title: string, content: string) {
        return this.openNotificationWithIcon('info', title, content);
    }
}

export default NotificationService;
