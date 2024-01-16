export const GET_USERS_QUERY = `
    SELECT
        users.id, users.name, users.lastname, users.email, users.role, users.avatar,
        friendship.status
    FROM
        users
    LEFT JOIN
        (SELECT * FROM friendship WHERE user1_id = ? OR user2_id = ?) AS friendship
    ON 
        users.id = friendship.user1_id OR users.id = friendship.user2_id 
    WHERE
        users.id != ?
  `;

export const GET_CHATS_QUERY = `
    SELECT 
        chat.*, 
        users.id, users.name, users.lastname, users.email, users.role, users.avatar,
        latest_message.sender_id, latest_message.value, latest_message.timestamp, latest_message.status
    FROM 
        chat
    INNER JOIN 
        users
    ON 
        chat.user1_id = users.id OR chat.user2_id = users.id
    LEFT JOIN 
        (
            SELECT 
                messages.chat_id, messages.sender_id, messages.value, messages.timestamp, messages.status
            FROM 
                messages 
            INNER JOIN 
                (
                    SELECT 
                        chat_id, MAX(message_id) AS latest_message_id 
                    FROM 
                        messages 
                    GROUP BY 
                        chat_id
                ) AS latest_messages
            ON 
                messages.chat_id = latest_messages.chat_id AND messages.message_id = latest_messages.latest_message_id
        ) AS latest_message
    ON 
        chat.chat_id = latest_message.chat_id
    WHERE 
        (chat.user1_id = ? OR chat.user2_id = ?) AND users.id != ?
  `;

export const GET_NOTIFICATIONS_QUERY = `
    SELECT 
        notif_id, notif_type, context, status, timestamp 
    FROM 
        notifications 
    WHERE 
        user_id = ?`;

export const GET_NEXT_NOTIFICATION_AUTOINCREMET = `
    SELECT 
        AUTO_INCREMENT 
    FROM 
        information_schema.TABLES 
    WHERE 
        TABLE_SCHEMA = 'propwise' AND TABLE_NAME = 'notifications'
`;

export const GET_NEXT_MESSAGE_AUTOINCREMET = `
    SELECT 
        AUTO_INCREMENT 
    FROM 
        information_schema.TABLES 
    WHERE 
        TABLE_SCHEMA = 'propwise' AND TABLE_NAME = 'messages'
`;

export const GET_MESSAGES_QUERY = `
    SELECT 
        messages.timestamp, messages.value, messages.sender_id, users.name, users.lastname, messages.status, messages.message_id
    FROM 
        messages
    INNER JOIN 
        users
    ON 
        messages.sender_id = users.id 
    WHERE 
        messages.chat_id = ?
    ORDER BY 
        message_id;
`;
