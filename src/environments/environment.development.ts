
const public_ip='s://sbcb.onrender.com'; 
const Local_IP='://127.0.0.1:8082';
const SERVER_IP = Local_IP

export const environment = {
    production: true,
    apiLogin: `http${SERVER_IP}/user/login`,
    apiGetInfo: `http${SERVER_IP}/user/info`,
    apiGetAtm: `http${SERVER_IP}/Atm/get`,
    urlSocketCl: `ws${SERVER_IP}/game/cl`,
    apiGetHistoryGame: `http${SERVER_IP}/game/getHistoryCl`,
    apiSaveHisPlayer: `http${SERVER_IP}/game/savePlayerHis`,
    apiSaveHisBalan:`http${SERVER_IP}/Atm/saveHis`,
    apiupdateBalan:`http${SERVER_IP}/Atm/updateBalance`,
    apigetListFriend :`http${SERVER_IP}/friend/getListFriend`,
    apiaddFriend :`http${SERVER_IP}/friend/addFriend`,
    apiacceptFriend :`http${SERVER_IP}/friend/acceptFriend`,
    apideleFriend :`http${SERVER_IP}/friend/deleteFriend`,
    apideleFriendRequets :`http${SERVER_IP}/friend/deleteFriendRequest`,
    apiGetrequets:`http${SERVER_IP}/friend/getFriendRequests`,
    keysecret:"anhthanhdz",
    apiSearchAtm: `http${SERVER_IP}/Atm/search`,
    apiSaveHisBalance: `http${SERVER_IP}/Atm/saveHis`,
    apiSearchFullname: `http${SERVER_IP}/user/searchFullname`,
    urlSocketMess: `w${SERVER_IP}/mess`,
    apiGetChatHis: `http${SERVER_IP}/mess/getChatHis`,
    apiFootball:  `http${SERVER_IP}/football/matches`,
    keyFootball:'17ee52ab7c3d494794f524ea8abff2f8',
    apigetbetHisfbxs:`http${SERVER_IP}/betHisfbxs/getbetHisfbxs`,
    apiPlaceBet:`http${SERVER_IP}/betHisfbxs/placeBet`,
    apiLottery :`https://xoso188.net/api/front/open/lottery/history/list/5/miba`,
    apiGetRelative:` http${SERVER_IP}/friend/getRelative`,
    apigetHisfbxs:`http${SERVER_IP}/betHisfbxs/getHisfbXs`,
    apiGetHisBalance:`http${SERVER_IP}/game/getPlayerHis`,
    apiGetPlayerHisAll:`http${SERVER_IP}/game/getPlayerHisAll`,
    apiRegister:`http${SERVER_IP}/user/regis`,

};
