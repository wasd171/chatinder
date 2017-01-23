import notifier from 'node-notifier'


export default function showNotification(event, {title, message}) {
    const options = {
        title,
        message,
        subtitle: `Chatinder`,
        sound: true
    };

    notifier.notify(options);
}