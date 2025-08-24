const{app,BrowserWindow}=require('electron');
const{ipcMain}=require('electron');
const url=require('url');
const path=require('path');

function createWindow(){
    const mainWindow=new BrowserWindow({
        title:"Pomodoro Timer",
        width:400,
        height:400,
        frame:false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Path to preload script
            contextIsolation: true,   // Keeps context isolated for security
            nodeIntegration: false,   // Disables Node.js in the renderer (security best practice)
        }
    });

    const starturl=url.format({
     pathname:path.join(__dirname,'../build/index.html'),//connect to app
     protocol:'file',
     slashes:true
    });
    mainWindow.setWindowButtonVisibility(false);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(starturl);//load in electron window
    //close app event
    ipcMain.on('close-app',()=>{
        app.quit();
    });
}
app.whenReady().then(createWindow);