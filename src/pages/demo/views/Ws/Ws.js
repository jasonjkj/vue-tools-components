export default class Ws {
    constructor(options) {
        this.socket = null
        this.url = options.url
        this.protocols = options.protocols

        this.connectionError = options.connectionError
        this.connectionOpened = options.connectionOpened
        this.connectionClosed = options.connectionClosed

        this.receiveMsg = options.receiveMsg
        this.initWs(this.url, this.protocols)
    }

    initWs(url, protocols) {
        if (!window.WebSocket) {
            window.WebSocket = window.MozWebSocket;
        }
        if (window.WebSocket) {
            this.socket = new WebSocket(url, protocols);
            //执行实例的时间监听
            this.socket.onmessage = (event) => {
                this.receiveMsg(event)
            };
            this.socket.onopen = (event) => {
                this.connectionOpened && this.connectionOpened(event)
            };
            this.socket.onclose = (event) => {
                this.connectionClosed && this.connectionClosed(event)
            };
            this.socket.onerror = (event) => {
                alert("websocket连接出错了")
                this.connectionError && this.connectionError(event)
            };
        } else {
            alert("WebSocket 初始化失败(浏览器不支持websocket)");
        }
    }

    send(message) {
        if (this.socket.readyState === WebSocket.CONNECTING) {
            alert("正在链接中")
            return
        }
        if (this.socket.readyState === WebSocket.OPEN) {
            //已经链接并且可以通讯
            this.socket.send(message);
            return
        }
        if (this.socket.readyState === WebSocket.CLOSING) {
            alert('连接正在关闭')
            return
        }
        if (this.socket.readyState === WebSocket.CLOSED) {
            alert('连接已关闭或者没有链接成功')
            return
        }
    }

    close() {
        this.socket.close()
    }
}
