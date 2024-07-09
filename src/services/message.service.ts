import { message } from 'antd';

type MessageType = 'success' | 'warning' | 'error' | 'info';

class MessageService {
    static showMessage(type: MessageType, content: string) {
        switch (type) {
            case 'success':
                return message.success(content);
            case 'error':
                return message.error(content);
            case 'warning':
                return message.warning(content);
            default:
                return message.info(content);
        }
    }

    static success(content: string) {
        return this.showMessage('success', content);
    }

    static error(content: string) {
        return this.showMessage('error', content);
    }

    static warning(content: string) {
        return this.showMessage('warning', content);
    }

    static info(content: string) {
        return this.showMessage('info', content);
    }
}

export default MessageService;
