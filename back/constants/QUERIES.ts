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
        chat.*, users.id, users.name, users.lastname, users.email, users.role, users.avatar
    FROM 
        chat
    INNER JOIN 
        users
    ON 
        chat.user1_id = users.id OR chat.user2_id = users.id
    WHERE 
        (chat.user1_id = ? OR chat.user2_id = ?) AND users.id != ?;
  `;

export const GET_NOTIFICATIONS_QUERY = `
    SELECT 
        notif_id, notif_type, context, status, timestamp 
    FROM 
        notifications 
    WHERE 
        user_id = ?`;
