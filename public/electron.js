const{app,BrowserWindow}=require('electron');
const url=require('url');
const path=require('path');

function createWindow(){
    const mainWindow=new BrowserWindow({
        title:"Pomodoro Timer",
        width:400,
        height:400
    });

    const starturl=url.format({
     pathname:path.join(__dirname,'../build/index.html'),//connect to app
     protocol:'file',
     slashes:true
    });
    mainWindow.loadURL(starturl);//load in electron window
}
app.whenReady().then(createWindow);