! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ZapparSharing = t() : e.ZapparSharing = t()
}(window, (function() {
    return function(e) {
        var t = {};

        function i(s) {
            if (t[s]) return t[s].exports;
            var n = t[s] = {
                i: s,
                l: !1,
                exports: {}
            };
            return e[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports
        }
        return i.m = e, i.c = t, i.d = function(e, t, s) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: s
            })
        }, i.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, i.t = function(e, t) {
            if (1 & t && (e = i(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var s = Object.create(null);
            if (i.r(s), Object.defineProperty(s, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var n in e) i.d(s, n, function(t) {
                    return e[t]
                }.bind(null, n));
            return s
        }, i.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return i.d(t, "a", t), t
        }, i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, i.p = "", i(i.s = 0)
    }([function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const s = i(1);
        t.default = function(e, t, i = {
            SAVE: "SAVE",
            SHARE: "SHARE",
            NowOpenFilesAppToShare: "Now open files app to share",
            TapAndHoldToSave: "Tap and hold the image<br/>to save to your Photos app"
        }) {
            new s.default(t).captureimage(e, i)
        }
    }, function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const s = i(2),
            n = new(i(5).default);
        class o extends s.default {
            constructor() {
                super(...arguments), this.containerPreview = o._getContainerPreview(), this.containerButtons = o._getContainerFlex(), this.instructionsText = o._getInstructionsP()
            }
            captureimage(e, t) {
                if (o._dialogOpen) throw new Error("Snapshot Dialog is already open.");
                if (e.data.includes("video/mp4")) return void this.shareVideo(e, t);
                o._dialogOpen = !0, document.body.append(this.containerPreview), this.containerPreview.appendChild(o._getSvgClose(() => {
                    var t;
                    null === (t = e.onClose) || void 0 === t || t.call(e), this.destroy()
                }));
                const i = o._getPreviewImage(e.data);
                if (this.containerButtons.appendChild(this.instructionsText), o._dataURItoFileBlob(e.data, ".jpeg", e.fileNamePrepend).then(i => {
                        if (e.hideShareButton) return;
                        const s = o._prepareShare(i, "jpeg", e.shareUrl, e.shareTitle, e.shareText, t.SHARE);
                        null == s || s.addEventListener("click", () => {
                            var t;
                            null === (t = e.onShare) || void 0 === t || t.call(e)
                        }), n.iOSFilesAppForPhotoShare || !s || e.hideShareButton || this.containerButtons.appendChild(s)
                    }), n.longPressForImageShare ? this._displayMessage(t.TapAndHoldToSave) : i.style.pointerEvents = "none", this.containerPreview.appendChild(this.containerButtons), n.iOS12HideSave) return;
                const s = o._getButtonSave(e.data, o._getFileName("jpeg", e.fileNamePrepend), t.SAVE);
                this.containerButtons.appendChild(s), n.iOSFilesAppForPhotoShare ? s.addEventListener("click", () => {
                    var i;
                    null === (i = e.onSave) || void 0 === i || i.call(e), e.hideShareButton || (this._displayMessage(t.NowOpenFilesAppToShare), s.remove(), this.containerButtons.appendChild(o._getOpenFilesButton()))
                }) : s.addEventListener("click", () => {
                    var t;
                    null === (t = e.onSave) || void 0 === t || t.call(e)
                })
            }
            _displayMessage(e) {
                this.instructionsText.innerHTML = e, this.instructionsText.style.display = "block"
            }
            static _dataURItoBlob(e) {
                return fetch(e).then(e => e.blob())
            }
            shareVideo(e, t) {
                if (o._dialogOpen) throw new Error("Snapshot Dialog is already open.");
                o._dialogOpen = !0, document.body.append(this.containerPreview), this.containerPreview.appendChild(o._getSvgClose(() => {
                    var t;
                    null === (t = e.onClose) || void 0 === t || t.call(e), this.destroy()
                })), o._getPreviewVideo(e.data), this.containerButtons.appendChild(this.instructionsText), o._dataURItoFileBlob(e.data, ".mp4", e.fileNamePrepend).then(i => {
                    if (e.hideShareButton) return;
                    const s = o._prepareShare(i, "mp4", e.shareUrl, e.shareTitle, e.shareText, t.SHARE);
                    null == s || s.addEventListener("click", () => {
                        var t;
                        null === (t = e.onShare) || void 0 === t || t.call(e)
                    }), n.iOSFilesAppForPhotoShare || !s || e.hideShareButton || this.containerButtons.appendChild(s)
                });
                const i = o._getButtonSave(e.data, o._getFileName("mp4", e.fileNamePrepend), t.SAVE);
                this.containerButtons.appendChild(i), this.containerPreview.appendChild(this.containerButtons), n.iOSFilesAppForPhotoShare ? i.addEventListener("click", () => {
                    var s;
                    null === (s = e.onSave) || void 0 === s || s.call(e), e.hideShareButton || (this._displayMessage(t.NowOpenFilesAppToShare), i.remove(), this.containerButtons.appendChild(o._getOpenFilesButton()))
                }) : i.addEventListener("click", () => {
                    var t;
                    null === (t = e.onSave) || void 0 === t || t.call(e)
                })
            }
            static _prepareShare(e, t, i = "", s = "", a = "", r) {
                if (!navigator.canShare) return;
                if (!navigator.canShare({
                        files: [e]
                    })) return;
                const l = o._getShareButton(r);
                return l.addEventListener("click", async () => {
                    try {
                        const t = {
                            files: [e]
                        };
                        n.imageOnlyInShareData || (t.url = i, t.title = s, t.text = a), await navigator.share(t)
                    } catch (e) {
                        console.log("Unable to share", e.message)
                    }
                }), l
            }
            destroy() {
                const e = document.getElementById("ZapparSnapshotContainer");
                null == e || e.querySelectorAll("*").forEach(e => e.remove()), document.body.removeChild(e), this.instructionsText.style.display = "none", o._dialogOpen = !1
            }
            static _getFileName(e, t = "Zappar") {
                return `${t}.${e}`
            }
            static async _dataURItoFileBlob(e, t, i) {
                const s = await fetch(e).then(e => e.blob());
                return new File([s], "" + o._getFileName(t, i), {
                    type: s.type
                })
            }
        }
        t.default = o, o._dialogOpen = !1
    }, function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const s = i(3),
            n = i(4);
        class o {
            constructor(e) {
                if (e)
                    for (const t of Object.keys(e))
                        for (const i of Object.keys(e[t])) {
                            const n = e[t][i];
                            n && (s.default[t][i] = n)
                        }
            }
            static createElement(e, t) {
                const i = document.createElement(e);
                return Object.assign(i, t), Object.assign(i.style, t.style), i
            }
            static createSVG(e, t) {
                const i = document.createElement("div"),
                    s = (new DOMParser).parseFromString(e, "application/xml");
                i.appendChild(i.ownerDocument.importNode(s.documentElement, !0));
                const n = i.firstChild;
                return Object.assign(n.style, t.style), n
            }
            static _getContainerPreview() {
                return o.createElement("div", {
                    style: s.default.containerDiv,
                    id: "ZapparSnapshotContainer"
                })
            }
            static _getSvgClose(e) {
                const t = o.createElement("div", {
                        style: s.default.buttonCloseAnchor,
                        id: "zapparCloseAref",
                        onclick: () => e()
                    }),
                    i = o.createSVG(n.getCloseSvgStr(), {
                        style: s.default.buttonCloseImage
                    });
                return t.appendChild(i), t
            }
            static _getContainerFlex() {
                return o.createElement("div", {
                    style: s.default.flexContainerDiv
                })
            }
            static _getButtonSave(e, t, i) {
                const a = o.createElement("a", {
                        style: s.default.saveShareAnchor,
                        id: "zapparSaveButton",
                        href: e,
                        download: t,
                        target: "_blank"
                    }),
                    r = o.createSVG(n.getSaveSvgStr(i), {
                        style: s.default.saveShareAnchor
                    });
                return a.appendChild(r), a
            }
            static _getPreviewVideo(e) {
                var t;
                const i = o.createElement("video", {
                    style: s.default.previewElement,
                    id: "ZapparPreviewVideo"
                });
                i.controls = !0;
                const n = document.createElement("source");
                return n.src = e, i.appendChild(n), null === (t = document.getElementById("ZapparSnapshotContainer")) || void 0 === t || t.appendChild(i), i
            }
            static _getPreviewImage(e) {
                var t;
                const i = o.createElement("img", {
                    style: s.default.previewElement,
                    src: e,
                    id: "ZapparPreviewImg"
                });
                return null === (t = document.getElementById("ZapparSnapshotContainer")) || void 0 === t || t.appendChild(i), i
            }
            static _getShareButton(e) {
                const t = o.createElement("a", {
                        style: s.default.saveShareAnchor,
                        id: "zapparShareButton"
                    }),
                    i = o.createSVG(n.getShareSvgStr(e), {
                        style: s.default.saveShareAnchor
                    });
                return t.appendChild(i), t
            }
            static _getOpenFilesButton() {
                return o.createElement("a", {
                    style: s.default.buttonOpenFiles,
                    id: "zapparOpenFilesButton",
                    href: "shareddocuments://",
                    innerText: "Open Files App"
                })
            }
            static _getInstructionsP() {
                return o.createElement("p", {
                    style: s.default.instructions,
                    id: "zapparInstructionsp"
                })
            }
        }
        t.default = o
    }, function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = {
            saveShareAnchor: {
                display: "flex",
                width: "70px",
                height: "70px",
                marginTop: "2.5%",
                marginLeft: "5%",
                marginRight: "5%"
            },
            buttonImage: {
                pointerEvents: "none",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                width: "40px",
                height: "40px"
            },
            buttonCloseAnchor: {
                width: "15px",
                height: "15px",
                margin: "4%",
                zIndex: 9999,
                top: 0,
                position: "absolute"
            },
            previewElement: {
                height: "auto",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#ccc",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.5)",
                display: "flex"
            },
            containerDiv: {
                position: "fixed",
                width: "100%",
                height: "100%",
                top: "0px",
                left: "0px",
                zIndex: 1e4,
                backgroundColor: "rgba(43,43,43,1)",
                fontFamily: "sans-serif",
                color: "rgba(43,43,43,1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            },
            flexContainerDiv: {
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
            },
            buttonCloseImage: {
                pointerEvents: "none",
                width: "15px",
                height: "15px"
            },
            buttonOpenFiles: {
                border: "2px solid black",
                textTransform: "uppercase",
                padding: "10px",
                minWidth: "50px",
                color: "black",
                display: "inline - block",
                marginTop: "20px",
                textDecoration: "none",
                borderRadius: "10px",
                paddingTop: "15px"
            },
            instructions: {
                color: "black",
                marginBottom: "0",
                width: "100%",
                textAlign: "center",
                display: "none"
            }
        }
    }, function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getShareSvgStr = t.getSaveSvgStr = t.getCloseSvgStr = void 0, t.getCloseSvgStr = function() {
            return '<svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="general-flow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g id="picture-/-front-camera-/-share-send" transform="translate(-20.000000, -45.000000)" stroke="#344B60">\n            <g id="side-nav" transform="translate(21.000000, 46.000000)">\n                <g id="icon-/-exit">\n                    <g id="icon-/-burger">\n                        <path d="M0.750914431,0.250914431 L12.2609577,11.7609577" id="Line" stroke-width="2.2"></path>\n                        <path d="M0.892335787,11.9405069 L12.4023791,0.430463641" id="Line-Copy-2" stroke-width="2.2"></path>\n                    </g>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>'
        }, t.getSaveSvgStr = function(e = "SAVE") {
            return `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n\t viewBox="0 0 45 50" style="enable-background:new 0 0 74.4 46;" xml:space="preserve">\n<style type="text/css">\n\t.st0{fill:#344B60;}\n\t.st1{font-family:'SinhalaSangamMN-Bold';}\n\t.st2{font-size:0.7em;}\n</style>\n<g id="general-flow">\n\t<g id="picture-_x2F_-front-camera-_x2F_-share-send" transform="translate(-59.000000, -591.000000)">\n\t\t<g id="save_1_" transform="translate(45.000000, 591.000000)">\n\t\t\t<g id="icon-_x2F_-save">\n\t\t\t\t<g id="save">\n\t\t\t\t\t<path id="Path-6" class="st0" d="M23.2,30c-0.6,0-1-0.4-1-1s0.4-1,1-1h28c0.6,0,1,0.4,1,1s-0.4,1-1,1H23.2z"/>\n\t\t\t\t\t<g id="arrow" transform="translate(8.000000, 0.000000)">\n\t\t\t\t\t\t<g id="icon-_x2F_-arrow">\n\t\t\t\t\t\t\t<path id="Combined-Shape" class="st0" d="M29.6,20.5l3.7-3.3c0.4-0.4,1-0.3,1.4,0.1c0.4,0.4,0.3,1-0.1,1.4l-6.1,5.6l-5.9-5.6\n\t\t\t\t\t\t\t\tc-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.7,3.4V8.2c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1v12.3H29.6z"/>\n\t\t\t\t\t\t</g>\n\t\t\t\t\t</g>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</g>\n<text x="50%" y="90%" dominant-baseline="middle" class="st0 st1 st2" text-anchor="middle">${e}</text>\n</svg>\n`
        }, t.getShareSvgStr = function(e = "SHARE") {
            return `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 45 50" style="enable-background:new 0 0 74.4 46;" xml:space="preserve">\n<style type="text/css">\n\t.st0{fill:#344B60;}\n\t.st1{font-family:'SinhalaSangamMN-Bold';}\n\t.st2{font-size:0.7em;}\n</style>\n<g id="Design-v3">\n\t<g id="picture-copy" transform="translate( -105.000000, -540.000000 )">\n\t\t<g id="share" transform="translate(108.000000, 547.000000)">\n\t\t\t<g id="icon-_x2F_-share" transform="translate(10.000000, 0.000000)">\n\t\t\t\t<g>\n\t\t\t\t\t<path id="Rectangle-6" class="st0" d="M2.7,14.5v7.6h13.6v-7.6H2.7z M1.4,13.2h16.3v9c0,0.8-0.6,1.4-1.4,1.4H2.7\n\t\t\t\t\t\tc-0.7,0-1.4-0.6-1.4-1.4V13.2z"/>\n\t\t\t\t\t<path id="Rectangle-6-Copy" class="st0" d="M1.4,9v4.2h16.3V9H1.4z M1.4,7.6h16.3C18.4,7.6,19,8.2,19,9v4.2\n\t\t\t\t\t\tc0,0.8-0.6,1.4-1.4,1.4H1.4c-0.7,0-1.4-0.6-1.4-1.4V9C0,8.2,0.6,7.6,1.4,7.6z"/>\n\t\t\t\t\t<polygon id="Path-9" class="st0" points="10.3,22.4 9,22.4 9,8.7 10.3,8.7 \t\t\t\t\t"/>\n\t\t\t\t\t<path id="Oval-7" class="st0" d="M10.2,6.8L9.7,8.2L9.2,6.9C7.6,5.1,6.8,3.8,6.8,2.8C6.8,1.2,8,0,9.5,0s2.7,1.2,2.7,2.8\n\t\t\t\t\t\tC12.2,3.7,11.5,5.1,10.2,6.8z M10.9,2.8c0-0.8-0.6-1.4-1.4-1.4S8.1,2,8.1,2.8c0,0.5,0.5,1.3,1.5,2.5\n\t\t\t\t\t\tC10.4,4.1,10.9,3.2,10.9,2.8z"/>\n\t\t\t\t\t<path id="Oval-7_1_" class="st0" d="M10.6,8l-1,0L10,7c1-2.3,1.8-3.7,2.6-4.2c1.3-0.8,3-0.5,3.8,0.8s0.4,3-0.8,3.8\n\t\t\t\t\t\tC14.8,7.9,13.1,8.1,10.6,8z M14.8,6.3c0.6-0.4,0.8-1.3,0.4-1.9C14.8,3.7,14,3.6,13.3,4c-0.4,0.3-1,1.2-1.7,2.6\n\t\t\t\t\t\tC13.3,6.7,14.4,6.5,14.8,6.3z"/>\n\t\t\t\t\t<path id="Oval-7_2_" class="st0" d="M8.7,8l1,0L9.3,7c-1-2.3-1.8-3.7-2.6-4.2C5.4,2,3.7,2.4,2.9,3.6s-0.4,3,0.8,3.8\n\t\t\t\t\t\tC4.5,7.9,6.1,8.1,8.7,8z M4.4,6.3C3.8,5.8,3.6,5,4,4.4S5.3,3.6,5.9,4c0.4,0.3,1,1.2,1.7,2.6C5.9,6.7,4.8,6.5,4.4,6.3z"/>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</g>\n<text x="50%" y="90%" dominant-baseline="middle" class="st0 st1 st2" text-anchor="middle">${e}</text>\n</svg>`
        }
    }, function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        const s = i(6);
        class n {
            constructor() {
                var e;
                switch (this.agent = new s.UAParser, this.muteByDefault = !1, this.blacklisted = !1, this.longPressForImageShare = !1, this.iOS12HideSave = !1, this.iOSFilesAppForPhotoShare = !1, this.imageOnlyInShareData = !1, this.ios = !1, this.os = null === (e = this.agent.getOS().version) || void 0 === e ? void 0 : e.split("."), this.agent.getBrowser().name) {
                    case "Mobile Safari":
                        this._initMobileSafari();
                        break;
                    case "Chrome":
                        n._initChrome();
                        break;
                    case "Safari":
                        this._initSafari()
                }
            }
            static _initChrome() {}
            _initSafari() {
                this.muteByDefault = !0
            }
            _initMobileSafari() {
                var e;
                this.ios = !0, this.muteByDefault = !0, this.longPressForImageShare = !0, this.imageOnlyInShareData = !0;
                const t = null === (e = this.agent.getOS().version) || void 0 === e ? void 0 : e.split(".");
                if (t && t.length >= 2) {
                    const e = parseInt(t[0], 10),
                        i = parseInt(t[1], 10);
                    (e < 11 || 11 === e && i < 3) && (this.blacklisted = !0), 12 === e && (this.iOS12HideSave = !0), e >= 13 && (this.longPressForImageShare = !1, this.iOSFilesAppForPhotoShare = !0), e >= 15 && (this.iOSFilesAppForPhotoShare = !1, this.longPressForImageShare = !1)
                }
            }
        }
        t.default = n
    }, function(e, t, i) {
        var s;
        /*!@license
         * UAParser.js v0.7.28
         * Lightweight JavaScript-based User-Agent string parser
         * https://github.com/faisalman/ua-parser-js
         *
         * Copyright Â© 2012-2021 Faisal Salman <f@faisalman.com>
         * Licensed under MIT License
         */
        ! function(n, o) {
            "use strict";
            var a = "model",
                r = "name",
                l = "type",
                d = "vendor",
                c = "version",
                u = "mobile",
                p = "tablet",
                w = "smarttv",
                h = {
                    extend: function(e, t) {
                        var i = {};
                        for (var s in e) t[s] && t[s].length % 2 == 0 ? i[s] = t[s].concat(e[s]) : i[s] = e[s];
                        return i
                    },
                    has: function(e, t) {
                        return "string" == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                    },
                    lowerize: function(e) {
                        return e.toLowerCase()
                    },
                    major: function(e) {
                        return "string" == typeof e ? e.replace(/[^\d\.]/g, "").split(".")[0] : void 0
                    },
                    trim: function(e, t) {
                        return e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), void 0 === t ? e : e.substring(0, 255)
                    }
                },
                g = {
                    rgx: function(e, t) {
                        for (var i, s, n, o, a, r, l = 0; l < t.length && !a;) {
                            var d = t[l],
                                c = t[l + 1];
                            for (i = s = 0; i < d.length && !a;)
                                if (a = d[i++].exec(e))
                                    for (n = 0; n < c.length; n++) r = a[++s], "object" == typeof(o = c[n]) && o.length > 0 ? 2 == o.length ? "function" == typeof o[1] ? this[o[0]] = o[1].call(this, r) : this[o[0]] = o[1] : 3 == o.length ? "function" != typeof o[1] || o[1].exec && o[1].test ? this[o[0]] = r ? r.replace(o[1], o[2]) : void 0 : this[o[0]] = r ? o[1].call(this, r, o[2]) : void 0 : 4 == o.length && (this[o[0]] = r ? o[3].call(this, r.replace(o[1], o[2])) : void 0) : this[o] = r || void 0;
                            l += 2
                        }
                    },
                    str: function(e, t) {
                        for (var i in t)
                            if ("object" == typeof t[i] && t[i].length > 0) {
                                for (var s = 0; s < t[i].length; s++)
                                    if (h.has(t[i][s], e)) return "?" === i ? void 0 : i
                            } else if (h.has(t[i], e)) return "?" === i ? void 0 : i;
                        return e
                    }
                },
                b = {
                    browser: {
                        oldSafari: {
                            version: {
                                "1.0": "/8",
                                1.2: "/1",
                                1.3: "/3",
                                "2.0": "/412",
                                "2.0.2": "/416",
                                "2.0.3": "/417",
                                "2.0.4": "/419",
                                "?": "/"
                            }
                        },
                        oldEdge: {
                            version: {
                                .1: "12.",
                                21: "13.",
                                31: "14.",
                                39: "15.",
                                41: "16.",
                                42: "17.",
                                44: "18."
                            }
                        }
                    },
                    os: {
                        windows: {
                            version: {
                                ME: "4.90",
                                "NT 3.11": "NT3.51",
                                "NT 4.0": "NT4.0",
                                2e3: "NT 5.0",
                                XP: ["NT 5.1", "NT 5.2"],
                                Vista: "NT 6.0",
                                7: "NT 6.1",
                                8: "NT 6.2",
                                8.1: "NT 6.3",
                                10: ["NT 6.4", "NT 10.0"],
                                RT: "ARM"
                            }
                        }
                    }
                },
                m = {
                    browser: [
                        [/\b(?:crmo|crios)\/([\w\.]+)/i],
                        [c, [r, "Chrome"]],
                        [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                        [c, [r, "Edge"]],
                        [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i, /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i],
                        [r, c],
                        [/opios[\/\s]+([\w\.]+)/i],
                        [c, [r, "Opera Mini"]],
                        [/\sopr\/([\w\.]+)/i],
                        [c, [r, "Opera"]],
                        [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, /(ba?idubrowser)[\/\s]?([\w\.]+)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i, /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i, /(weibo)__([\d\.]+)/i],
                        [r, c],
                        [/(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                        [c, [r, "UCBrowser"]],
                        [/(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i],
                        [c, [r, "WeChat(Win) Desktop"]],
                        [/micromessenger\/([\w\.]+)/i],
                        [c, [r, "WeChat"]],
                        [/konqueror\/([\w\.]+)/i],
                        [c, [r, "Konqueror"]],
                        [/trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i],
                        [c, [r, "IE"]],
                        [/yabrowser\/([\w\.]+)/i],
                        [c, [r, "Yandex"]],
                        [/(avast|avg)\/([\w\.]+)/i],
                        [
                            [r, /(.+)/, "$1 Secure Browser"], c
                        ],
                        [/focus\/([\w\.]+)/i],
                        [c, [r, "Firefox Focus"]],
                        [/opt\/([\w\.]+)/i],
                        [c, [r, "Opera Touch"]],
                        [/coc_coc_browser\/([\w\.]+)/i],
                        [c, [r, "Coc Coc"]],
                        [/dolfin\/([\w\.]+)/i],
                        [c, [r, "Dolphin"]],
                        [/coast\/([\w\.]+)/i],
                        [c, [r, "Opera Coast"]],
                        [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                        [c, [r, "MIUI Browser"]],
                        [/fxios\/([\w\.-]+)/i],
                        [c, [r, "Firefox"]],
                        [/(qihu|qhbrowser|qihoobrowser|360browser)/i],
                        [
                            [r, "360 Browser"]
                        ],
                        [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],
                        [
                            [r, /(.+)/, "$1 Browser"], c
                        ],
                        [/(comodo_dragon)\/([\w\.]+)/i],
                        [
                            [r, /_/g, " "], c
                        ],
                        [/\s(electron)\/([\w\.]+)\ssafari/i, /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i],
                        [r, c],
                        [/(MetaSr)[\/\s]?([\w\.]+)/i, /(LBBROWSER)/i],
                        [r],
                        [/;fbav\/([\w\.]+);/i],
                        [c, [r, "Facebook"]],
                        [/FBAN\/FBIOS|FB_IAB\/FB4A/i],
                        [
                            [r, "Facebook"]
                        ],
                        [/safari\s(line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/\s]([\w\.-]+)/i],
                        [r, c],
                        [/\bgsa\/([\w\.]+)\s.*safari\//i],
                        [c, [r, "GSA"]],
                        [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                        [c, [r, "Chrome Headless"]],
                        [/\swv\).+(chrome)\/([\w\.]+)/i],
                        [
                            [r, "Chrome WebView"], c
                        ],
                        [/droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i],
                        [c, [r, "Android Browser"]],
                        [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                        [r, c],
                        [/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i],
                        [c, [r, "Mobile Safari"]],
                        [/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i],
                        [c, r],
                        [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                        [r, [c, g.str, b.browser.oldSafari.version]],
                        [/(webkit|khtml)\/([\w\.]+)/i],
                        [r, c],
                        [/(navigator|netscape)\/([\w\.-]+)/i],
                        [
                            [r, "Netscape"], c
                        ],
                        [/ile\svr;\srv:([\w\.]+)\).+firefox/i],
                        [c, [r, "Firefox Reality"]],
                        [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i, /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                        [r, c]
                    ],
                    cpu: [
                        [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                        [
                            ["architecture", "amd64"]
                        ],
                        [/(ia32(?=;))/i],
                        [
                            ["architecture", h.lowerize]
                        ],
                        [/((?:i[346]|x)86)[;\)]/i],
                        [
                            ["architecture", "ia32"]
                        ],
                        [/\b(aarch64|armv?8e?l?)\b/i],
                        [
                            ["architecture", "arm64"]
                        ],
                        [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                        [
                            ["architecture", "armhf"]
                        ],
                        [/windows\s(ce|mobile);\sppc;/i],
                        [
                            ["architecture", "arm"]
                        ],
                        [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                        [
                            ["architecture", /ower/, "", h.lowerize]
                        ],
                        [/(sun4\w)[;\)]/i],
                        [
                            ["architecture", "sparc"]
                        ],
                        [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
                        [
                            ["architecture", h.lowerize]
                        ]
                    ],
                    device: [
                        [/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i],
                        [a, [d, "Samsung"],
                            [l, p]
                        ],
                        [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i, /\ssamsung[\s-]([\w-]+)/i, /sec-(sgh\w+)/i],
                        [a, [d, "Samsung"],
                            [l, u]
                        ],
                        [/\((ip(?:hone|od)[\s\w]*);/i],
                        [a, [d, "Apple"],
                            [l, u]
                        ],
                        [/\((ipad);[\w\s\),;-]+apple/i, /applecoremedia\/[\w\.]+\s\((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                        [a, [d, "Apple"],
                            [l, p]
                        ],
                        [/\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i],
                        [a, [d, "Huawei"],
                            [l, p]
                        ],
                        [/d\/huawei([\w\s-]+)[;\)]/i, /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i, /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i],
                        [a, [d, "Huawei"],
                            [l, u]
                        ],
                        [/\b(poco[\s\w]+)(?:\sbuild|\))/i, /\b;\s(\w+)\sbuild\/hm\1/i, /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i, /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i, /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i],
                        [
                            [a, /_/g, " "],
                            [d, "Xiaomi"],
                            [l, u]
                        ],
                        [/\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i],
                        [
                            [a, /_/g, " "],
                            [d, "Xiaomi"],
                            [l, p]
                        ],
                        [/;\s(\w+)\sbuild.+\soppo/i, /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i],
                        [a, [d, "OPPO"],
                            [l, u]
                        ],
                        [/\svivo\s(\w+)(?:\sbuild|\))/i, /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i],
                        [a, [d, "Vivo"],
                            [l, u]
                        ],
                        [/\s(rmx[12]\d{3})(?:\sbuild|;)/i],
                        [a, [d, "Realme"],
                            [l, u]
                        ],
                        [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i, /\smot(?:orola)?[\s-](\w*)/i, /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i],
                        [a, [d, "Motorola"],
                            [l, u]
                        ],
                        [/\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                        [a, [d, "Motorola"],
                            [l, p]
                        ],
                        [/((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i],
                        [a, [d, "LG"],
                            [l, p]
                        ],
                        [/(lm-?f100[nv]?|nexus\s[45])/i, /lg[e;\s\/-]+((?!browser|netcast)\w+)/i, /\blg(\-?[\d\w]+)\sbuild/i],
                        [a, [d, "LG"],
                            [l, u]
                        ],
                        [/(ideatab[\w\-\s]+)/i, /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i],
                        [a, [d, "Lenovo"],
                            [l, p]
                        ],
                        [/(?:maemo|nokia).*(n900|lumia\s\d+)/i, /nokia[\s_-]?([\w\.-]*)/i],
                        [
                            [a, /_/g, " "],
                            [d, "Nokia"],
                            [l, u]
                        ],
                        [/droid.+;\s(pixel\sc)[\s)]/i],
                        [a, [d, "Google"],
                            [l, p]
                        ],
                        [/droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i],
                        [a, [d, "Google"],
                            [l, u]
                        ],
                        [/droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                        [a, [d, "Sony"],
                            [l, u]
                        ],
                        [/sony\stablet\s[ps]\sbuild\//i, /(?:sony)?sgp\w+(?:\sbuild\/|\))/i],
                        [
                            [a, "Xperia Tablet"],
                            [d, "Sony"],
                            [l, p]
                        ],
                        [/\s(kb2005|in20[12]5|be20[12][59])\b/i, /\ba000(1)\sbuild/i, /\boneplus\s(a\d{4})[\s)]/i],
                        [a, [d, "OnePlus"],
                            [l, u]
                        ],
                        [/(alexa)webm/i, /(kf[a-z]{2}wi)(\sbuild\/|\))/i, /(kf[a-z]+)(\sbuild\/|\)).+silk\//i],
                        [a, [d, "Amazon"],
                            [l, p]
                        ],
                        [/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i],
                        [
                            [a, "Fire Phone"],
                            [d, "Amazon"],
                            [l, u]
                        ],
                        [/\((playbook);[\w\s\),;-]+(rim)/i],
                        [a, d, [l, p]],
                        [/((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10;\s(\w+)/i],
                        [a, [d, "BlackBerry"],
                            [l, u]
                        ],
                        [/(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i],
                        [a, [d, "ASUS"],
                            [l, p]
                        ],
                        [/\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i],
                        [a, [d, "ASUS"],
                            [l, u]
                        ],
                        [/(nexus\s9)/i],
                        [a, [d, "HTC"],
                            [l, p]
                        ],
                        [/(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
                        [d, [a, /_/g, " "],
                            [l, u]
                        ],
                        [/droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
                        [a, [d, "Acer"],
                            [l, p]
                        ],
                        [/droid.+;\s(m[1-5]\snote)\sbuild/i, /\bmz-([\w-]{2,})/i],
                        [a, [d, "Meizu"],
                            [l, u]
                        ],
                        [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i, /(microsoft);\s(lumia[\s\w]+)/i, /(lenovo)[_\s-]?([\w-]+)/i, /linux;.+(jolla);/i, /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                        [d, a, [l, u]],
                        [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i, /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i, /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i, /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i, /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i],
                        [d, a, [l, p]],
                        [/\s(surface\sduo)\s/i],
                        [a, [d, "Microsoft"],
                            [l, p]
                        ],
                        [/droid\s[\d\.]+;\s(fp\du?)\sbuild/i],
                        [a, [d, "Fairphone"],
                            [l, u]
                        ],
                        [/\s(u304aa)\sbuild/i],
                        [a, [d, "AT&T"],
                            [l, u]
                        ],
                        [/sie-(\w*)/i],
                        [a, [d, "Siemens"],
                            [l, u]
                        ],
                        [/[;\/]\s?(rct\w+)\sbuild/i],
                        [a, [d, "RCA"],
                            [l, p]
                        ],
                        [/[;\/\s](venue[\d\s]{2,7})\sbuild/i],
                        [a, [d, "Dell"],
                            [l, p]
                        ],
                        [/[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i],
                        [a, [d, "Verizon"],
                            [l, p]
                        ],
                        [/[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i],
                        [a, [d, "Barnes & Noble"],
                            [l, p]
                        ],
                        [/[;\/]\s(tm\d{3}\w+)\sbuild/i],
                        [a, [d, "NuVision"],
                            [l, p]
                        ],
                        [/;\s(k88)\sbuild/i],
                        [a, [d, "ZTE"],
                            [l, p]
                        ],
                        [/;\s(nx\d{3}j)\sbuild/i],
                        [a, [d, "ZTE"],
                            [l, u]
                        ],
                        [/[;\/]\s?(gen\d{3})\sbuild.*49h/i],
                        [a, [d, "Swiss"],
                            [l, u]
                        ],
                        [/[;\/]\s?(zur\d{3})\sbuild/i],
                        [a, [d, "Swiss"],
                            [l, p]
                        ],
                        [/[;\/]\s?((zeki)?tb.*\b)\sbuild/i],
                        [a, [d, "Zeki"],
                            [l, p]
                        ],
                        [/[;\/]\s([yr]\d{2})\sbuild/i, /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i],
                        [
                            [d, "Dragon Touch"], a, [l, p]
                        ],
                        [/[;\/]\s?(ns-?\w{0,9})\sbuild/i],
                        [a, [d, "Insignia"],
                            [l, p]
                        ],
                        [/[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i],
                        [a, [d, "NextBook"],
                            [l, p]
                        ],
                        [/[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i],
                        [
                            [d, "Voice"], a, [l, u]
                        ],
                        [/[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i],
                        [
                            [d, "LvTel"], a, [l, u]
                        ],
                        [/;\s(ph-1)\s/i],
                        [a, [d, "Essential"],
                            [l, u]
                        ],
                        [/[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i],
                        [a, [d, "Envizen"],
                            [l, p]
                        ],
                        [/[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i],
                        [a, [d, "MachSpeed"],
                            [l, p]
                        ],
                        [/[;\/]\s?tu_(1491)\sbuild/i],
                        [a, [d, "Rotor"],
                            [l, p]
                        ],
                        [/(shield[\w\s]+)\sbuild/i],
                        [a, [d, "Nvidia"],
                            [l, p]
                        ],
                        [/(sprint)\s(\w+)/i],
                        [d, a, [l, u]],
                        [/(kin\.[onetw]{3})/i],
                        [
                            [a, /\./g, " "],
                            [d, "Microsoft"],
                            [l, u]
                        ],
                        [/droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                        [a, [d, "Zebra"],
                            [l, p]
                        ],
                        [/droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i],
                        [a, [d, "Zebra"],
                            [l, u]
                        ],
                        [/\s(ouya)\s/i, /(nintendo)\s([wids3utch]+)/i],
                        [d, a, [l, "console"]],
                        [/droid.+;\s(shield)\sbuild/i],
                        [a, [d, "Nvidia"],
                            [l, "console"]
                        ],
                        [/(playstation\s[345portablevi]+)/i],
                        [a, [d, "Sony"],
                            [l, "console"]
                        ],
                        [/[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i],
                        [a, [d, "Microsoft"],
                            [l, "console"]
                        ],
                        [/smart-tv.+(samsung)/i],
                        [d, [l, w]],
                        [/hbbtv.+maple;(\d+)/i],
                        [
                            [a, /^/, "SmartTV"],
                            [d, "Samsung"],
                            [l, w]
                        ],
                        [/(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i],
                        [
                            [d, "LG"],
                            [l, w]
                        ],
                        [/(apple)\s?tv/i],
                        [d, [a, "Apple TV"],
                            [l, w]
                        ],
                        [/crkey/i],
                        [
                            [a, "Chromecast"],
                            [d, "Google"],
                            [l, w]
                        ],
                        [/droid.+aft([\w])(\sbuild\/|\))/i],
                        [a, [d, "Amazon"],
                            [l, w]
                        ],
                        [/\(dtv[\);].+(aquos)/i],
                        [a, [d, "Sharp"],
                            [l, w]
                        ],
                        [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                        [
                            [d, h.trim],
                            [a, h.trim],
                            [l, w]
                        ],
                        [/[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i],
                        [
                            [l, w]
                        ],
                        [/((pebble))app\/[\d\.]+\s/i],
                        [d, a, [l, "wearable"]],
                        [/droid.+;\s(glass)\s\d/i],
                        [a, [d, "Google"],
                            [l, "wearable"]
                        ],
                        [/droid\s[\d\.]+;\s(wt63?0{2,3})\)/i],
                        [a, [d, "Zebra"],
                            [l, "wearable"]
                        ],
                        [/(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i],
                        [d, [l, "embedded"]],
                        [/droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i],
                        [a, [l, u]],
                        [/droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i],
                        [a, [l, p]],
                        [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                        [
                            [l, h.lowerize]
                        ],
                        [/(android[\w\.\s\-]{0,9});.+build/i],
                        [a, [d, "Generic"]],
                        [/(phone)/i],
                        [
                            [l, u]
                        ]
                    ],
                    engine: [
                        [/windows.+\sedge\/([\w\.]+)/i],
                        [c, [r, "EdgeHTML"]],
                        [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                        [c, [r, "Blink"]],
                        [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                        [r, c],
                        [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                        [c, r]
                    ],
                    os: [
                        [/microsoft\s(windows)\s(vista|xp)/i],
                        [r, c],
                        [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i],
                        [r, [c, g.str, b.os.windows.version]],
                        [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                        [
                            [r, "Windows"],
                            [c, g.str, b.os.windows.version]
                        ],
                        [/ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i, /cfnetwork\/.+darwin/i],
                        [
                            [c, /_/g, "."],
                            [r, "iOS"]
                        ],
                        [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i],
                        [
                            [r, "Mac OS"],
                            [c, /_/g, "."]
                        ],
                        [/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/\s]([\w\.]+)/i, /\((series40);/i],
                        [r, c],
                        [/\(bb(10);/i],
                        [c, [r, "BlackBerry"]],
                        [/(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i],
                        [c, [r, "Symbian"]],
                        [/mozilla.+\(mobile;.+gecko.+firefox/i],
                        [
                            [r, "Firefox OS"]
                        ],
                        [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                        [c, [r, "webOS"]],
                        [/crkey\/([\d\.]+)/i],
                        [c, [r, "Chromecast"]],
                        [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                        [
                            [r, "Chromium OS"], c
                        ],
                        [/(nintendo|playstation)\s([wids345portablevuch]+)/i, /(xbox);\s+xbox\s([^\);]+)/i, /(mint)[\/\s\(\)]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i, /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku)\s(\w+)/i],
                        [r, c],
                        [/(sunos)\s?([\w\.\d]*)/i],
                        [
                            [r, "Solaris"], c
                        ],
                        [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i],
                        [r, c]
                    ]
                },
                v = function(e, t) {
                    if ("object" == typeof e && (t = e, e = void 0), !(this instanceof v)) return new v(e, t).getResult();
                    var i = e || (void 0 !== n && n.navigator && n.navigator.userAgent ? n.navigator.userAgent : ""),
                        s = t ? h.extend(m, t) : m;
                    return this.getBrowser = function() {
                        var e = {
                            name: void 0,
                            version: void 0
                        };
                        return g.rgx.call(e, i, s.browser), e.major = h.major(e.version), e
                    }, this.getCPU = function() {
                        var e = {
                            architecture: void 0
                        };
                        return g.rgx.call(e, i, s.cpu), e
                    }, this.getDevice = function() {
                        var e = {
                            vendor: void 0,
                            model: void 0,
                            type: void 0
                        };
                        return g.rgx.call(e, i, s.device), e
                    }, this.getEngine = function() {
                        var e = {
                            name: void 0,
                            version: void 0
                        };
                        return g.rgx.call(e, i, s.engine), e
                    }, this.getOS = function() {
                        var e = {
                            name: void 0,
                            version: void 0
                        };
                        return g.rgx.call(e, i, s.os), e
                    }, this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        }
                    }, this.getUA = function() {
                        return i
                    }, this.setUA = function(e) {
                        return i = "string" == typeof e && e.length > 255 ? h.trim(e, 255) : e, this
                    }, this.setUA(i), this
                };
            v.VERSION = "0.7.28", v.BROWSER = {
                NAME: r,
                MAJOR: "major",
                VERSION: c
            }, v.CPU = {
                ARCHITECTURE: "architecture"
            }, v.DEVICE = {
                MODEL: a,
                VENDOR: d,
                TYPE: l,
                CONSOLE: "console",
                MOBILE: u,
                SMARTTV: w,
                TABLET: p,
                WEARABLE: "wearable",
                EMBEDDED: "embedded"
            }, v.ENGINE = {
                NAME: r,
                VERSION: c
            }, v.OS = {
                NAME: r,
                VERSION: c
            }, void 0 !== t ? (void 0 !== e && e.exports && (t = e.exports = v), t.UAParser = v) : void 0 === (s = function() {
                return v
            }.call(t, i, t, e)) || (e.exports = s);
            var f = void 0 !== n && (n.jQuery || n.Zepto);
            if (f && !f.ua) {
                var x = new v;
                f.ua = x.getResult(), f.ua.get = function() {
                    return x.getUA()
                }, f.ua.set = function(e) {
                    x.setUA(e);
                    var t = x.getResult();
                    for (var i in t) f.ua[i] = t[i]
                }
            }
        }("object" == typeof window ? window : this)
    }]).default
}));
