const SERVER_IP = '192.168.1.155'; 

export const environment = {
    production: false,
    apiLogin: `http://${SERVER_IP}:8082/user/login`,
    apiGetInfo: `http://${SERVER_IP}:8082/user/info`,
    apiGetAtm: `http://${SERVER_IP}:8082/Atm/get`,
    urlSocketCl: `ws://${SERVER_IP}:8082/game/cl`,
    apiGetHistoryGame: `http://${SERVER_IP}:8082/game/getHistoryCl`,
    apiSaveHisPlayer: `http://${SERVER_IP}:8082/game/savePlayerHis`,
    apiSaveHisBalan:`http://${SERVER_IP}:8082/Atm/saveHis`,
    apiupdateBalan:`http://${SERVER_IP}:8082/Atm/updateBalan`,
    keysecret:"anhthanhdz",
    apiSearchAtm: `http://${SERVER_IP}:8082/Atm/search`,
    apiSaveHisBalance: `http://${SERVER_IP}:8082/Atm/saveHis`,
    apiSearchFullname: `http://${SERVER_IP}:8082/user/searchFullname`,
    urlSocketMess: `ws://${SERVER_IP}:8082/mess`,
};