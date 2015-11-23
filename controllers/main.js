'use strict';

var ctrl = {
    root : {
        get : function(req, res) {
            res.json(req.session);
        },
        middleware : [
            function(req, res, next) {
                if(req.session) {
                    if(req.session.currRequestRoute) {
                        req.session.lastRequestRoute = req.session.currRequestRoute;
                    }

                    req.session.currRequestRoute = req.path;
                }

                next();
            }
        ]
    },
    doStuff : {
        get : function(req, res) {
            res.json(req.session.lastPutDate || '');
        },
        put : function(req, res) {
            req.session.lastPutDate = (new Date(Date.now())).toString();
            res.sendStatus(201);
        },
        patch : function(req, res, next) {
            try {
                if(!req.session.lastPutDate) throw new Error("No date!");
                var date = new Date(req.session.lastPutDate);
                date.setYear(date.getFullYear() + 10);
                req.session.lastPutDate = date.toString();
            } catch(e) {
                return next(e);
            }
            req.session.save(function(err) {
                if(err) return next(err);
                res.sendStatus(200);
            });
        },
        'delete' : function(req, res) {
            delete req.session.lastPutDate;
            res.sendStatus(204);
        },
        'default' : function(err, req, res) {
            res.status(500).
                json({
                    error : {
                        name : err.name,
                        message : err.message
                    }
                });
        }
    }
};

module.exports = ctrl;
