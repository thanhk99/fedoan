
const SERVER_IP = 'remarkably-arriving-imp.ngrok-free.app'; 

export const environment = {
    production: true,
    apiLogin: `https://${SERVER_IP}/user/login`,
    apiGetInfo: `https://${SERVER_IP}/user/info`,
    apiGetAtm: `https://${SERVER_IP}/Atm/get`,
    urlSocketCl: `wss://${SERVER_IP}/game/cl`,
    apiGetHistoryGame: `https://${SERVER_IP}/game/getHistoryCl`,
    apiSaveHisPlayer: `https://${SERVER_IP}/game/savePlayerHis`,
    apiSaveHisBalan:`https://${SERVER_IP}/Atm/saveHis`,
    apiupdateBalan:`https://${SERVER_IP}/Atm/updateBalance`,
    apigetListFriend :`https://${SERVER_IP}/friend/getListFriend`,
    apiaddFriend :`https://${SERVER_IP}/friend/addFriend`,
    apiacceptFriend :`https://${SERVER_IP}/friend/acceptFriend`,
    apideleFriend :`https://${SERVER_IP}/friend/deleteFriend`,
    apideleFriendRequets :`https://${SERVER_IP}/friend/deleteFriendRequest`,
    apiGetrequets:`https://${SERVER_IP}/friend/getFriendRequests`,
    keysecret:"anhthanhdz",
    apiSearchAtm: `https://${SERVER_IP}/Atm/search`,
    apiSaveHisBalance: `https://${SERVER_IP}/Atm/saveHis`,
    apiSearchFullname: `https://${SERVER_IP}/user/searchFullname`,
    urlSocketMess: `ws://${SERVER_IP}/mess`,
    apiGetChatHis: `https://${SERVER_IP}/mess/getChatHis`,
    apiFootball:  'https://api.football-data.org/v4/competitions/PL/matches',
    keyFootball:'17ee52ab7c3d494794f524ea8abff2f8',
    apigetbetHisfbxs:`https://${SERVER_IP}/betHisfbxs/getbetHisfbxs`,
    apiPlaceBet:`https://${SERVER_IP}/betHisfbxs/placeBet`,
    apiLottery :`httpss://xoso188.net/api/front/open/lottery/history/list/5/miba`,
    apiGetRelative:` https://${SERVER_IP}/friend/getRelative`,
    apigetHisfbxs:`https://${SERVER_IP}/betHisfbxs/getHisfbXs`,
    apiGetHisBalance:`https://${SERVER_IP}/game/getPlayerHis`,
    apiGetPlayerHisAll:`https://${SERVER_IP}/game/getPlayerHisAll`,
};