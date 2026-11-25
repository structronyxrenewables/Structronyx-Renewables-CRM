const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('structronyxDesktop',{platform:process.platform,version:'0.2.1'});
