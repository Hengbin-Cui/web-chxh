let Jie = {
    state: {
        xhr: '',
        isClickEvent: true
    },
    tool: {
        /**
         * 通知信息弹窗
         * @param msg  提示信息
         * @param callback 回调函数
         * @param config 参数
         */
        notification: function (msg, callback, config = {}) {
            if (!config.time || parseInt(config.time) <= 0) {
                config.time = 1400;
            }
            if (typeof layer === "object") {
                layer.msg(msg, config, callback);
            } else {
                alert(msg);
                let autoInterval = setInterval(function () {
                    callback();
                    clearInterval(autoInterval);
                }, time);
            }
        },
        /**
         * ajax提交数据
         * @param url 提交地址
         * @param data 提交数据
         * @param callback 回调函数
         * @param isAsync 是否异步
         */
        ajaxRequest: function (url, data, callback, isAsync = false) {
            if (Jie.state.xhr && isAsync) {
                Jie.state.xhr.abort();
            }
            Jie.state.xhr = $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: data,
                async: isAsync,
                success: function (result) {
                    callback(result);
                },
                error: function (result) {
                    if (typeof result.responseJSON === "object") {
                        Jie.tool.notification(result.responseJSON.msg);
                    } else {
                        Jie.tool.notification(result.statusText);
                    }
                },
            });
        },
        /**
         * ajax提交form表单
         * @param url 提交地址
         * @param data 提交数据
         * @param callback 回调函数
         * @param isAsync 是否异步
         */
        ajaxFormRequest: function (url, data, callback, isAsync = false) {
            if (Jie.state.xhr && isAsync) {
                Jie.state.xhr.abort();
            }
            Jie.state.xhr = $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: data,
                processData: false,
                contentType: false,
                success: function (result) {
                    callback(result);
                },
                async: isAsync,
                error: function (result) {
                    if (typeof result.responseJSON === "object") {
                        Jie.tool.notification(result.responseJSON.msg);
                    } else {
                        Jie.tool.notification(result.statusText);
                    }
                }
            });
        }
    },
    events: {
        /**
         * 滑动到指定id位置
         * @param id dom ID
         * @param top 顶部偏移距离
         */
        scrollPosition: function (id, top = 0) {
            let offset = $(id).offset();
            $('body,html').animate({
                scrollTop: offset.top + top
            });
        },
        /**
         * 点击提交数据事件
         * @param config 参数
         */
        ajaxSendEvent: function (config = {}) {
            if (config.elem) {
                $(config.elem).on('click', config.button ? config.button : 'button', function () {
                    if (Jie.state.isClickEvent) {
                        Jie.state.isClickEvent = false;
                        let dataForm, ajaxFun, _this = this;
                        if (config.data && typeof (config.data) === "function") {
                            dataForm = config.data();
                            ajaxFun = Jie.tool.ajaxRequest;
                        } else {
                            dataForm = new FormData($(_this).parents('form')[0]);
                            ajaxFun = Jie.tool.ajaxFormRequest;
                        }
                        if (config.verify && typeof (config.verify) === "function" && config.verify(dataForm) === false) {
                            Jie.state.isClickEvent = true;
                            return;
                        }
                        ajaxFun(config.url, dataForm, function (result) {
                            if (result.code === 1) {
                                if (config.success && typeof (config.success) === "function") {
                                    Jie.state.isClickEvent = true;
                                    config.success(result);
                                } else {
                                    Jie.tool.notification(result.msg, function () {
                                        window.location.href = result.url ? result.url : '';
                                    });
                                }
                            } else {
                                if (config.error && typeof (config.error) === "function") {
                                    Jie.state.isClickEvent = true;
                                    config.error(result);
                                } else {
                                    // $("form .form-verify").click();
                                    Jie.tool.notification(result.msg, function () {
                                        Jie.state.isClickEvent = true;
                                    });
                                }
                            }
                        });
                        return false;
                    }
                });
            }
        },
        /**
         * 点击加载数据事件
         * @param config 参数
         */
        clickLoadMore: function (config = {}) {
            let url = config.url ? config.url : '', template = config.template ? config.template : '',
                page = config.page ? config.page : 1, num = config.num ? config.num : 6,
                ajaxBox = config.box ? config.box : '#ajaxBox', button = config.button ? config.button : '#loadMore';
            $(document).on('click', button, function () {
                if (Jie.state.isClickEvent) {
                    Jie.state.isClickEvent = false;
                    page++;
                    Jie.tool.ajaxRequest(url, {page: page, template: template}, function (result) {
                        Jie.state.isClickEvent = true;
                        if (result.code === 1 && result.data) {
                            if ($('<div>').html(result.data).children().length < num) {
                                $(button).hide();
                            }
                            $(ajaxBox).append(result.data);
                        } else {
                            $(button).hide();
                        }
                    });
                }
            });
        },
        /**
         * 滚动加载数据事件
         * @param config 参数
         */
        scrollLoadMore: function (config = {}) {
            let url = config.url ? config.url : '', template = config.template ? config.template : '',
                page = config.page ? config.page : 1, num = config.num ? config.num : 6,
                ajaxBox = config.box ? config.box : '#ajaxBox', isScroll = true;
            $(window).scroll(function () {
                let pageHeight = $(window).scrollTop(),
                    thisHeight = $(ajaxBox).offset().top + $(ajaxBox).height() - $(window).height() - 300; //容器底部距离顶部的距离
                if (pageHeight > thisHeight && kai) {
                    if (isScroll) {
                        isScroll = false;
                        page++;
                        Jie.tool.ajaxRequest(url, {page: page, template: template}, function (result) {
                            isScroll = true;
                            if (result.code === 1 && result.data) {
                                if ($('<div>').html(result.data).children().length < num) {
                                    isScroll = false;
                                }
                                $(ajaxBox).append(result.data);
                            } else {
                                isScroll = false;
                            }
                        });
                    }
                }
            });

        }
    }
};

$("form .form-verify").click(function () {
    var verifyimg = $(this).attr("src");
    $(this).attr("src", verifyimg.replace(/\?.*$/, '') + '?' + Math.random());
});

