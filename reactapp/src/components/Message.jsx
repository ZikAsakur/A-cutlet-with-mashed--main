import './Message.css';

function Message({ text, type }) {

    if (!text) return null;

    return (
        <div className={`toast-message ${type}`}>
            <div className="toast-title">
                {type === 'success' ? 'Успешно' : 'Ошибка'}
            </div>

            <div className="toast-text">
                {text}
            </div>
        </div>
    );
}

export default Message;