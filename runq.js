

require("sleepless");


function Runq(done) {

	var o = {};

	var q = []

	var add = function(f) {
		q.push(f);
		log("added() qlen="+q.length);
		return o;
	};

	var run = function(cb, arg) {
		log("run() arg="+arg);
		if(q.length == 0) {
			cb(null, arg);
			return;
		}

		var f = q.shift();
		f(function(e, arg) {
			if(e) {
				log("[abort] "+e);
				q = []; // abort remaining
				cb(e, arg);
			}
			else {
				run(cb, arg);
			}
		}, arg);
	};

	o.add = add
	o.run = run
	log('created');
	return o
}


seq = 0;
f = function(cb, arg) {
	var s = ++seq
	var b = Math.random() >= 0.5;
	log("f() arg="+arg+" s="+s+" b="+b);
	if(b) {
		cb("error! "+s, "error arg");
	}
	else  {
		cb(null, arg+" okay "+s);
	}
}

Runq()
.add(f)
.add(f)
.run(function(e, r) {
	log("fin()  e="+e+" r="+o2j(r));
}, "mum");




/*




var Funq = require("funq");

var F = new Funq(function(err, res) {
	if(err)	
		log("Error: "+err);
	else
		log("Result: "+res);
});

F.do = function(f) {
	F.push(function(fail, done) {
		f(function(err, res) {
			if(err)
				fail(err)
			else
				done(res);
		});
	});
}


F.do(function(cb) {
	setTimeout(function() {
		log("hi");
		cb();
	}, 1000);
});


F.run();
*/




