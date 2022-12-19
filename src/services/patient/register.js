import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../../helpers/functions/createAccessToken.js';
// import fs from 'fs';
import nodemailer from 'nodemailer';
export async function register(req, res, next) {
    try {
        let {
            firstName,
            lastName,
            email,
            password,
            gender,
            phoneNumber,
            image,
        } = req.body;
        // let path1;
        // path1 = `${req.file.filename}`;
        const checkEmail = await prisma.patient.findUnique({
            where: {
                email,
            },
        });
        if (checkEmail) {
            // fs.unlinkSync(path1);
            return conflictResponse(res, 'Email is already exists');
        }
        const transporter = nodemailer.createTransport({
            secure: false,
            service: 'gmail',
            auth: {
                user: 'mostafasamysfsf@gmail.com',
                pass: 'giqhjmnbizkqmcnh',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: 'mostafasamysfsf@gmail',
            to: email,
            subject: 'Register Completed Successfully !',
            text: 'Thank you for registering with us !',
            html: `<!doctype html>
            <html>
            
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Email</title>
                <style>
                    /* -------------------------------------
                      GLOBAL RESETS
                  ------------------------------------- */
                    /*All the styling goes here*/
                    
                    img {
                        border: none;
                        -ms-interpolation-mode: bicubic;
                        max-width: 100%;
                    }
                    
                    body {
                        background-color: #f6f6f6;
                        font-family: sans-serif;
                        -webkit-font-smoothing: antialiased;
                        font-size: 14px;
                        line-height: 1.4;
                        margin: 0;
                        padding: 0;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                    }
                    
                    table {
                        border-collapse: separate;
                        width: 100%;
                    }
                    
                    table td {
                        font-family: sans-serif;
                        font-size: 14px;
                        vertical-align: top;
                    }
                    /* -------------------------------------
                      BODY & CONTAINER
                  ------------------------------------- */
                    
                    .body {
                        background-color: #f6f6f6;
                        width: 100%;
                    }
                    /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                    
                    .container {
                        display: block;
                        margin: 0 auto !important;
                        /* makes it centered */
                        max-width: 580px;
                        padding: 10px;
                        width: 580px;
                    }
                    /* This should also be a block element, so that it will fill 100% of the .container */
                    
                    .content {
                        box-sizing: border-box;
                        display: block;
                        margin: 0 auto;
                        max-width: 580px;
                        padding: 10px;
                    }
                    /* -------------------------------------
                      HEADER, FOOTER, MAIN
                  ------------------------------------- */
                    
                    .main {
                        background: #ffffff;
                        border-radius: 3px;
                        width: 100%;
                    }
                    
                    .wrapper {
                        box-sizing: border-box;
                        padding: 20px;
                    }
                    
                    .content-block {
                        padding-bottom: 10px;
                        padding-top: 10px;
                    }
                    
                    .footer {
                        clear: both;
                        margin-top: 10px;
                        text-align: center;
                        width: 100%;
                    }
                    
                    .footer td,
                    .footer p,
                    .footer span,
                    .footer a {
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                    }
                    /* -------------------------------------
                      TYPOGRAPHY
                  ------------------------------------- */
                    
                    h1,
                    h2,
                    h3,
                    h4 {
                        color: #000000;
                        font-family: sans-serif;
                        font-weight: 400;
                        line-height: 1.4;
                        margin: 0;
                        margin-bottom: 30px;
                    }
                    
                    h1 {
                        font-size: 35px;
                        font-weight: 300;
                        text-align: center;
                        text-transform: capitalize;
                    }
                    
                    p,
                    ul,
                    ol {
                        font-family: sans-serif;
                        font-size: 14px;
                        font-weight: normal;
                        margin: 0;
                        margin-bottom: 15px;
                    }
                    
                    p li,
                    ul li,
                    ol li {
                        list-style-position: inside;
                        margin-left: 5px;
                    }
                    
                    a {
                        color: #3498db;
                        text-decoration: underline;
                    }
                    .center {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        width: 50%;
                    }
                    /* -------------------------------------
                      BUTTONS
                  ------------------------------------- */
                    
                    .btn {
                        box-sizing: border-box;
                        width: 100%;
                    }
                    
                    .btn>tbody>tr>td {
                        padding-bottom: 15px;
                    }
                    
                    .btn table {
                        width: auto;
                    }
                    
                    .btn table td {
                        background-color: #ffffff;
                        border-radius: 5px;
                        text-align: center;
                    }
                    
                    .btn a {
                        background-color: #ffffff;
                        border: solid 1px #3498db;
                        border-radius: 5px;
                        box-sizing: border-box;
                        color: #3498db;
                        cursor: pointer;
                        display: inline-block;
                        font-size: 14px;
                        font-weight: bold;
                        margin: 0;
                        padding: 12px 25px;
                        text-decoration: none;
                        text-transform: capitalize;
                    }
                    
                    .btn-primary table td {
                        background-color: #3498db;
                    }
                    
                    .btn-primary a {
                        background-color: #3498db;
                        border-color: #3498db;
                        color: #ffffff;
                    }
                    /* -------------------------------------
                      OTHER STYLES THAT MIGHT BE USEFUL
                  ------------------------------------- */
                    
                    .last {
                        margin-bottom: 0;
                    }
                    
                    .first {
                        margin-top: 0;
                    }
                    
                    .align-center {
                        text-align: center;
                    }
                    
                    .align-right {
                        text-align: right;
                    }
                    
                    .align-left {
                        text-align: left;
                    }
                    
                    .clear {
                        clear: both;
                    }
                    
                    .mt0 {
                        margin-top: 0;
                    }
                    
                    .mb0 {
                        margin-bottom: 0;
                    }
                    
                    .preheader {
                        color: transparent;
                        display: none;
                        height: 0;
                        max-height: 0;
                        max-width: 0;
                        opacity: 0;
                        overflow: hidden;
                        visibility: hidden;
                        width: 0;
                    }
                    
                    .powered-by a {
                        text-decoration: none;
                    }
                    
                    hr {
                        border: 0;
                        border-bottom: 1px solid #f6f6f6;
                        margin: 20px 0;
                    }
                    /* -------------------------------------
                      RESPONSIVE AND MOBILE FRIENDLY STYLES
                  ------------------------------------- */
                    
                    @media only screen and (max-width: 620px) {
                        table.body h1 {
                            font-size: 28px !important;
                            margin-bottom: 10px !important;
                        }
                        table.body p,
                        table.body ul,
                        table.body ol,
                        table.body td,
                        table.body span,
                        table.body a {
                            font-size: 16px !important;
                        }
                        table.body .wrapper,
                        table.body .article {
                            padding: 10px !important;
                        }
                        table.body .content {
                            padding: 0 !important;
                        }
                        table.body .container {
                            padding: 0 !important;
                            width: 100% !important;
                        }
                        table.body .main {
                            border-left-width: 0 !important;
                            border-radius: 0 !important;
                            border-right-width: 0 !important;
                        }
                        table.body .btn table {
                            width: 100% !important;
                        }
                        table.body .btn a {
                            width: 100% !important;
                        }
                        table.body .img-responsive {
                            height: auto !important;
                            max-width: 100% !important;
                            width: auto !important;
                        }
                    }
                    /* -------------------------------------
                      PRESERVE THESE STYLES IN THE HEAD
                  ------------------------------------- */
                    
                    @media all {
                        .ExternalClass {
                            width: 100%;
                        }
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        .apple-link a {
                            color: inherit !important;
                            font-family: inherit !important;
                            font-size: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                            text-decoration: none !important;
                        }
                        #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                            font-size: inherit;
                            font-family: inherit;
                            font-weight: inherit;
                            line-height: inherit;
                        }
                        .btn-primary table td:hover {
                            background-color: #34495e !important;
                        }
                        .btn-primary a:hover {
                            background-color: #34495e !important;
                            border-color: #34495e !important;
                        }
                    }
                </style>
            </head>
            
            <body>
                <span class="preheader">Your Registeration to our Website is complete !</span>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                    <tr>
                        <td>&nbsp;</td>
                        <td class="container">
                            <div class="content">
            
                                <!-- START CENTERED WHITE CONTAINER -->
                                <table role="presentation" class="main">
            
                                    <!-- START MAIN CONTENT AREA -->
                                    <tr>
                                        <td class="wrapper">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                    <img src="http://azim.commonsupport.com/Optcare/assets/images/logo.png" alt="optcare" border="0" width="100" height="100" class="center">
                                                    <br><br>
                                                        <p>Hi ${firstName} ${lastName},</p>
                                                        <p>Welcome to OPTCARE &#128522;</p>
                                                        <p>OPTCARE is a clinical service for you to book appointment with professional doctors please browse our website and try our services &#127760;</p>
                                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left">
                                                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td> <a href="http://127.0.0.1:3000/" target="_blank">Visit Our Website</a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <p>And Remember >> Your Eye is our Care &#128065;&#65039;</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
            
                                    <!-- END MAIN CONTENT AREA -->
                                </table>
                                <!-- END CENTERED WHITE CONTAINER -->
            
                                <!-- START FOOTER -->
                                <div class="footer">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td class="content-block">
                                                <span class="apple-link">We have branches all over the country what are you waiting for ?</span>
                                                <br> Don't like these emails ? send me a mail back and i will stop sending you emails &#128521;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="content-block powered-by">
                                                Powered by Mostafa Abdelhamid &#128521;</a>.
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!-- END FOOTER -->
            
                            </div>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                </table>
            </body>
            
            </html>`,
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newPatient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                password: encryptedPassword,
                email,
                gender,
                phoneNumber,
                image: image,
            },
        });
        const newToken = await prisma.tokenPatient.create({
            data: {
                userId: newPatient.id,
            },
        });
        const accessToken = createAccessToken(newPatient.id, newToken.id);
        delete newPatient.password;
        // const pat = await prisma.patient.findUnique({
        //     where: {
        //         email,
        //     },
        // });
        // let Date_of_Birth = new Date(pat.birthDate);
        // let month_diff = Date.now() - Date_of_Birth.getTime();
        // let age_dt = new Date(month_diff);
        // let year = age_dt.getUTCFullYear();
        // let age = Math.abs(year - 1970);
        return okResponse(res, 'Patient created successfully', {
            ...newPatient,
            // age,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}