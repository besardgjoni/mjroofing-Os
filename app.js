

var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// Serve static assets from the public folder
var nodemailer = require('nodemailer');
var app_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var app_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

	// Routes - Main Form
	app.get('/', function(req,res) {
	  // main form just render the  input form
	 res.render('form');
	});




	// Routes - Completed Message - TODO Redirect to Form result?
	app.get('/completed', function(req,res) {
		var formData = app.get('data');
		sendAndDeletePdf (formData);
		res.render('completeRequest');
		res.end();
	});


	// Routes - Form Results
	app.get('/formResult', function(req,res) {
		// get stored data
		var formData = app.get('data');
		// rendor the form for view
		res.render('formResult', { theData: formData });
	}); 


	function sendAndDeletePdf (formData){
		// initial values- for pdf name/headers
		var customerEmail = formData.subTo;
		var mjEmailName  = formData.fullName+ "_" + formData.jobAddress2 + "_" + formData.proposalNum;
		mjEmailName  = mjEmailName.replace(/ /g,"_").toUpperCase();
		var pdfPath = './public/temp/'+ 'temp' + '.pdf';

		var phantom = require('phantom');   

		phantom.create().then(function(ph) {
				ph.createPage().then(function(page) {
				// 	page.property("paperSize", {
				// 	format: 'Letter',
				// 	orientation: 'portrait',
				// 	margin: '10cm'
				// });

				// page.property("viewportSize", {
				// 	width: 1024,
				// 	height: 1452
				// });

				// page property is buggy. TODO: find better solution

				page.paperSize = { 
					format: "Letter",
					orientation: "portrait",
					margin: '10cm',

				};

				page.viewportSize = {
					width: 1024,
					height: 1452
				};
				page.zoomFactor = 0;


				page.open("http://" +  app_ip_address + ":" + app_port + "/formResult").then(function(status) {
					page.render(pdfPath).then(function() {
						// email pdf auth
						var transporter = nodemailer.createTransport({
							service: 'Gmail',
							auth: {
								user: 'mjroofingsite@gmail.com', // Your email id
								pass: 'Lakers338' // Your password
							}
						}); // end transporter config

						// customer copy
						transporter.sendMail({
							from: '"M&J Service" <mjroofingsite@gmail.com>', // sender address
							to: customerEmail, // list of receivers
							subject: 'Proposal Invoice ', // Subject line
							text: 'Attached is your invoice. Please print and sign.', //, // plaintext body
							attachments: [{
								filename: formData.proposalNum+'.pdf',
								path: pdfPath,
								contentType: 'application/pdf'
							}], function (err, info) {
									if(err){console.error(err);}
									else{console.log(info);}
								}
						}); // end transporter send mail customer copy

						// company copy
						transporter.sendMail({
							from: '"M&J Service" <mjroofingsite@gmail.com>', // sender address
							to: 'mjroofingsite@gmail.com',  // list of receivers
							subject: mjEmailName, // Subject line
							text: '', //, // plaintext body
							attachments: [{
								filename: mjEmailName+'.pdf',
								path: pdfPath,
								contentType: 'application/pdf'
							}], function (err, info) {
									if(err){console.error(err);}
									else{console.log("deleted");}
								}
						}); // end transporter send mail company copy

						page.close();
						ph.exit();
					}); // end page.render
				}); // end page.opem
			}); // end ph.create
			//phantom.exit();
		}); // end phantom.create
	}; // end sendand deleter pdf

	// TODO CHANGE NAME
	app.post('/sendFormPost', function(req, res){
		app.set('data', req.body);
	});


// DO NOT TOUCH
// var app_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
// var app_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
	app.listen(app_port, app_ip_address, function () {
	  console.log( "Listening onn " + app_ip_address + ", port " + app_port );
	});


