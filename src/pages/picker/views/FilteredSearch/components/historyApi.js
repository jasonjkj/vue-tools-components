import remove from 'lodash/remove'
import Moment from 'moment'
//localStory 兼容IE
if (!window.localStorage) {
    window.localStorage = {
        getItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return null;
            }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
            return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
            if (!sKey) {
                return;
            }
            document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return;
            }
            document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            this.length--;
        },
        hasOwnProperty: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
    };
    window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}
//时间的历史纪录
class searchHistory {
    constructor(key = 'searchHistory', maxLength = 10) {
        this.key = key
        this.maxLength = maxLength

        if (!this.getHistory()) {
            localStorage.setItem(this.key, '[]');
        }
    }

    getHistory() {
        var historyList = JSON.parse(localStorage.getItem(this.key))
        return historyList
    }

    setHistory(val) {
        localStorage.setItem(this.key, JSON.stringify(val));
    }

    addItem(item) {
        //新增 一条历史记录
    }

    clear() {
        localStorage.setItem(this.key, '[]');
    }
}
var history = new searchHistory();
export default history
