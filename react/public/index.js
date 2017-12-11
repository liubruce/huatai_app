localStorage.setItem("arriveTime", new Date().getTime());
window.jquery = $;
document.addEventListener("deviceready", function() {
    navigator.Wechat = Wechat;
    navigator.PERSISTENT = LocalFileSystem.PERSISTENT;
    var fileTransfer = new FileTransfer();
    navigator.fileTransfer = fileTransfer;
}, false);
