
<<<<<<< HEAD
const SERVER_IP = '127.0.0.1'; 
=======
<<<<<<< HEAD
const SERVER_IP = '192.168.0.109'; 
=======
const SERVER_IP = '192.168.0.101'; 
>>>>>>> 418afe66bf6a1d6768d086ba6cfd86d09f87fce5
>>>>>>> 7a0e1836a473d4c1af8346cfb01dbab9f0b7f632
export const environment = {
    production: true,
    apiLogin: `http://${SERVER_IP}:8082/user/login`,
    apiGetInfo: `http://${SERVER_IP}:8082/user/info`,
    apiGetAtm: `http://${SERVER_IP}:8082/Atm/get`,
    urlSocketCl: `ws://${SERVER_IP}:8082/game/cl`,
    apiGetHistoryGame: `http://${SERVER_IP}:8082/game/getHistoryCl`,
    apiSaveHisPlayer: `http://${SERVER_IP}:8082/game/savePlayerHis`,
    apiSaveHisBalan:`http://${SERVER_IP}:8082/Atm/saveHis`,
    apiupdateBalan:`http://${SERVER_IP}:8082/Atm/updateBalance`,
    apigetListFriend :`http://${SERVER_IP}:8082/friend/getListFriend`,
    apiaddFriend :`http://${SERVER_IP}:8082/friend/addFriend`,
    apiacceptFriend :`http://${SERVER_IP}:8082/friend/acceptFriend`,
    apideleFriend :`http://${SERVER_IP}:8082/friend/deleteFriend`,
    apideleFriendRequets :`http://${SERVER_IP}:8082/friend/deleteFriendRequest`,
    apiGetrequets:`http://${SERVER_IP}:8082/friend/getFriendRequests`,
    keysecret:"anhthanhdz",
    apiSearchAtm: `http://${SERVER_IP}:8082/Atm/search`,
    apiSaveHisBalance: `http://${SERVER_IP}:8082/Atm/saveHis`,
    apiSearchFullname: `http://${SERVER_IP}:8082/user/searchFullname`,
    urlSocketMess: `ws://${SERVER_IP}:8082/mess`,
    apiGetChatHis: `http://${SERVER_IP}:8082/mess/getChatHis`,
    apiFootball:  '/api/competitions/PL/matches',
    keyFootball:'17ee52ab7c3d494794f524ea8abff2f8',
    apigetHisfbxs:`http://${SERVER_IP}:8082/betHisfbxs/getHisfbXs`,
};